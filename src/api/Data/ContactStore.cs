using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Argus.Site.Api.Configuration;
using Microsoft.Extensions.Options;

namespace Argus.Site.Api.Data;

/// <summary>A contact request as it was stored. Addresses are kept only as a hash.</summary>
public sealed record ContactRequestRecord(
    string Id,
    string Name,
    string Email,
    string? Company,
    string Topic,
    string Message,
    string? IpHash,
    string? UserAgent,
    DateTimeOffset CreatedAt);

/// <summary>
/// The site's durable memory: one JSON object per line in the deployment's data
/// folder. Append-only, so a submission can never overwrite an earlier one, and a
/// fresh volume needs no migration. At this volume (a contact form, not a queue)
/// that is simpler and more robust than a database server.
/// </summary>
public sealed class ContactStore(IOptions<SiteOptions> options, ILogger<ContactStore> logger)
{
    private static readonly JsonSerializerOptions Json = new(JsonSerializerDefaults.Web);
    private readonly SiteOptions _options = options.Value;
    private readonly SemaphoreSlim _writeLock = new(1, 1);

    private string FilePath
    {
        get
        {
            var directory = string.IsNullOrWhiteSpace(_options.DataDirectory) ? "data" : _options.DataDirectory;
            return Path.Combine(Path.GetFullPath(directory), _options.ContactFileName);
        }
    }

    public async Task AddAsync(ContactRequestRecord record, CancellationToken cancellationToken)
    {
        var path = FilePath;
        Directory.CreateDirectory(Path.GetDirectoryName(path)!);
        var line = JsonSerializer.Serialize(record, Json) + "\n";

        await _writeLock.WaitAsync(cancellationToken);
        try
        {
            await using var stream = new FileStream(
                path,
                FileMode.Append,
                FileAccess.Write,
                FileShare.Read,
                bufferSize: 4096,
                FileOptions.Asynchronous);
            await using var writer = new StreamWriter(stream, new UTF8Encoding(encoderShouldEmitUTF8Identifier: false));
            await writer.WriteAsync(line.AsMemory(), cancellationToken);
            await writer.FlushAsync(cancellationToken);
            // A lead that a power cut could lose is not stored. One line is cheap to sync.
            stream.Flush(flushToDisk: true);
        }
        finally
        {
            _writeLock.Release();
        }
    }

    public async Task<IReadOnlyList<ContactRequestRecord>> ListAsync(int limit, CancellationToken cancellationToken)
    {
        var path = FilePath;
        if (!File.Exists(path))
            return [];

        var records = new List<ContactRequestRecord>();
        await using var stream = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite, 4096, FileOptions.Asynchronous);
        using var reader = new StreamReader(stream, Encoding.UTF8);

        while (await reader.ReadLineAsync(cancellationToken) is { } line)
        {
            if (string.IsNullOrWhiteSpace(line))
                continue;

            try
            {
                var record = JsonSerializer.Deserialize<ContactRequestRecord>(line, Json);
                if (record is not null)
                    records.Add(record);
            }
            catch (JsonException ex)
            {
                // One damaged line must not hide every request beside it.
                logger.LogWarning(ex, "Skipped an unreadable line in the contact store.");
            }
        }

        // Newest first, and no more than asked for.
        return records.TakeLast(Math.Clamp(limit, 1, 1000)).Reverse().ToArray();
    }

    /// <summary>A cheap check for the readiness probe: the folder exists or can be made, and is writable.</summary>
    public Task<bool> CanReachAsync(CancellationToken cancellationToken)
    {
        try
        {
            var path = FilePath;
            var directory = Path.GetDirectoryName(path)!;
            Directory.CreateDirectory(directory);
            var probe = Path.Combine(directory, $".probe-{Guid.NewGuid():n}");
            using (var stream = new FileStream(probe, FileMode.CreateNew, FileAccess.Write, FileShare.None, 1, FileOptions.DeleteOnClose))
                stream.WriteByte(0);
            return Task.FromResult(true);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            logger.LogWarning(ex, "The contact store could not be reached.");
            return Task.FromResult(false);
        }
    }

    /// <summary>
    /// A stable, non-reversible fingerprint of a request's address, so abuse can be seen
    /// without keeping personal data that is not needed to answer someone.
    /// </summary>
    public string? HashAddress(string? address)
    {
        if (string.IsNullOrWhiteSpace(address))
            return null;

        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(address.Trim() + _options.IpHashSalt));
        return Convert.ToHexString(bytes)[..32].ToLowerInvariant();
    }
}
