using System.Net.Http.Headers;
using System.Text.Json;
using Argus.Site.Api.Configuration;
using Microsoft.Extensions.Options;

namespace Argus.Site.Api.Releases;

public sealed record ChangeEntry(
    string Tag,
    string Name,
    DateTimeOffset? PublishedAt,
    string Url,
    string? Summary,
    bool Prerelease);

public sealed record ReleaseFeedResult(
    string Source,
    DateTimeOffset FetchedAt,
    IReadOnlyList<ChangeEntry> Releases);

/// <summary>
/// The releases shown on the changelog page. They come from the repository's own
/// GitHub releases, kept for ten minutes, with a small built-in list for the
/// deployments that have no way out to the internet (the same hosts the product is for).
/// </summary>
public sealed class ReleaseFeed(
    IHttpClientFactory httpClientFactory,
    IOptions<SiteOptions> options,
    ILogger<ReleaseFeed> logger)
{
    private const string Repository = "Binchitects/argus";
    private static readonly TimeSpan CacheFor = TimeSpan.FromMinutes(10);
    private static readonly TimeSpan RetryAfterFailure = TimeSpan.FromMinutes(1);

    private readonly SemaphoreSlim _lock = new(1, 1);
    private ReleaseFeedResult? _cached;

    /// <summary>What the changelog falls back to when GitHub is out of reach. Kept short on purpose.</summary>
    private static readonly ChangeEntry[] Fallback =
    [
        new("v7.7.0", "Network access, every setting at install, and Code Arena signed for Windows", new DateTimeOffset(2026, 11, 2, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.7.0",
            "Network access allow and block lists, every setting at install, arenactl on the host, Code Arena signed for Windows and on Arm, six colour themes, and admins who remove a request from the line or restart an engine.",
            false),
        new("v7.6.3", "An offline installer that checks first and leaves nothing behind", new DateTimeOffset(2026, 10, 31, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.6.3",
            "The offline installer works, checks everything before it starts, leaves nothing behind when it fails, and builds faster; the GPUs and the CPU are throttled before they run too hot.",
            false),
        new("v7.6.2", "The commands the app tells people to run, brought up to date", new DateTimeOffset(2026, 10, 30, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.6.2",
            "A hotfix: what the app tells people to run names the commands of today.",
            false),
        new("v7.6.1", "vLLM and DCGM from images that can be pulled everywhere", new DateTimeOffset(2026, 10, 30, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.6.1",
            "The vLLM engine and NVIDIA's DCGM exporter from images that can be pulled where NVIDIA's registry refuses, and so carried in the offline bundle.",
            false),
        new("v7.6.0", "Company knowledge from more places, Agent Studio, and a code index", new DateTimeOffset(2026, 10, 30, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.6.0",
            "Company knowledge by upload and from many more places, Ask your data on more databases and files, Agent Studio that reacts to GitLab and acts on it, and Code Arena with a code index of its own.",
            false),
        new("v7.5.0", "Arena for many people at once, with a fair line", new DateTimeOffset(2026, 10, 29, 0, 0, 0, TimeSpan.Zero),
            "https://github.com/Binchitects/argus/releases/tag/v7.5.0",
            "Arena for many people at once: a fair line when it is busy, a dashboard for each role, API keys of one's own, a prompt log, and SGLang joining llama.cpp and vLLM as an engine chosen at install.",
            false),
    ];

    public async Task<ReleaseFeedResult> GetAsync(CancellationToken cancellationToken)
    {
        var cached = _cached;
        if (cached is not null && DateTimeOffset.UtcNow - cached.FetchedAt < CacheFor)
            return cached;

        await _lock.WaitAsync(cancellationToken);
        try
        {
            cached = _cached;
            if (cached is not null && DateTimeOffset.UtcNow - cached.FetchedAt < CacheFor)
                return cached;

            var now = DateTimeOffset.UtcNow;
            try
            {
                var releases = await FetchAsync(cancellationToken);
                if (releases.Count > 0)
                {
                    _cached = new ReleaseFeedResult("github", now, releases);
                    return _cached;
                }
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
            {
                logger.LogWarning(ex, "GitHub releases could not be read; serving the built-in list.");
            }

            // Keep the last good answer if there was one; the page should not go blank
            // because GitHub had a bad minute.
            _cached = cached is { Source: "github" }
                ? cached with { FetchedAt = now }
                : new ReleaseFeedResult("fallback", now, Fallback);

            // Retry soon, without asking GitHub on every page view.
            if (_cached.Source == "fallback")
                _cached = _cached with { FetchedAt = now - CacheFor + RetryAfterFailure };

            return _cached;
        }
        finally
        {
            _lock.Release();
        }
    }

    private async Task<IReadOnlyList<ChangeEntry>> FetchAsync(CancellationToken cancellationToken)
    {
        var client = httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.UserAgent.Add(new ProductInfoHeaderValue("argus-site", "1.0"));
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/vnd.github+json"));
        client.DefaultRequestHeaders.Add("X-GitHub-Api-Version", "2022-11-28");

        var token = options.Value.GitHubToken;
        if (!string.IsNullOrWhiteSpace(token))
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(TimeSpan.FromSeconds(5));

        using var response = await client.GetAsync(
            $"https://api.github.com/repos/{Repository}/releases?per_page=15",
            timeout.Token);
        response.EnsureSuccessStatusCode();

        await using var stream = await response.Content.ReadAsStreamAsync(timeout.Token);
        using var document = await JsonDocument.ParseAsync(stream, cancellationToken: timeout.Token);

        var entries = new List<ChangeEntry>();
        foreach (var release in document.RootElement.EnumerateArray())
        {
            if (release.TryGetProperty("draft", out var draft) && draft.GetBoolean())
                continue;

            var tag = release.TryGetProperty("tag_name", out var tagElement) ? tagElement.GetString() : null;
            if (string.IsNullOrWhiteSpace(tag))
                continue;

            var name = release.TryGetProperty("name", out var nameElement) ? nameElement.GetString() : null;
            DateTimeOffset? publishedAt = release.TryGetProperty("published_at", out var publishedElement)
                && publishedElement.ValueKind == JsonValueKind.String
                && publishedElement.TryGetDateTimeOffset(out var parsed)
                    ? parsed
                    : null;
            var url = release.TryGetProperty("html_url", out var urlElement) ? urlElement.GetString() : null;
            var body = release.TryGetProperty("body", out var bodyElement) ? bodyElement.GetString() : null;
            var prerelease = release.TryGetProperty("prerelease", out var preElement) && preElement.GetBoolean();

            entries.Add(new ChangeEntry(
                tag,
                string.IsNullOrWhiteSpace(name) ? tag : name,
                publishedAt,
                string.IsNullOrWhiteSpace(url) ? $"https://github.com/{Repository}/releases/tag/{tag}" : url,
                Summarize(body),
                prerelease));
        }

        return entries;
    }

    /// <summary>The first paragraph of a release's notes, which is where the release says what it is.</summary>
    private static string? Summarize(string? body)
    {
        if (string.IsNullOrWhiteSpace(body))
            return null;

        foreach (var raw in body.Replace("\r\n", "\n").Split('\n'))
        {
            var line = raw.Trim();
            if (line.Length == 0 || line.StartsWith('#') || line.StartsWith('>') || line.StartsWith('<')
                || line.StartsWith("- ") || line.StartsWith("###") || line.StartsWith("![") || line.Contains("badge"))
                continue;

            var text = System.Text.RegularExpressions.Regex.Replace(line, @"\[([^\]]+)\]\([^)]+\)", "$1");
            if (text.Length > 420)
                text = text[..417].TrimEnd() + "…";
            return text;
        }

        return null;
    }
}
