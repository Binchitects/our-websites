namespace Argus.Site.Api.Configuration;

/// <summary>Everything the public site's API needs to know, bound from the "Site" section.</summary>
public sealed class SiteOptions
{
    public const string SectionName = "Site";

    /// <summary>The site build shown in health responses.</summary>
    public string Version { get; set; } = "1.0.0";

    /// <summary>Folder that keeps what people send. Created on first write.</summary>
    public string DataDirectory { get; set; } = "data";

    /// <summary>File inside <see cref="DataDirectory"/> holding contact requests, one JSON object per line.</summary>
    public string ContactFileName { get; set; } = "contact-requests.jsonl";

    /// <summary>
    /// Salt for the irreversible hash of a request's address. Empty hashes the address
    /// as it is; setting a deployment-wide salt makes the stored value useless anywhere else.
    /// </summary>
    public string IpHashSalt { get; set; } = "";

    /// <summary>Maximum contact requests one address may send per window.</summary>
    public int ContactPermitLimit { get; set; } = 5;

    /// <summary>Length of the contact rate-limit window, in minutes.</summary>
    public int ContactWindowMinutes { get; set; } = 10;

    /// <summary>
    /// Optional address (Slack, Teams, a CRM) that receives each contact request as JSON.
    /// Delivery failures are logged and never fail the request.
    /// </summary>
    public string? ContactWebhookUrl { get; set; }

    /// <summary>Optional bearer token for reading stored requests. Empty disables the endpoint.</summary>
    public string? AdminToken { get; set; }

    /// <summary>Optional GitHub token, to lift the anonymous API rate limit on releases.</summary>
    public string? GitHubToken { get; set; }

    /// <summary>Allowed browser origins for the API, for running the web app on another port.</summary>
    public string[] AllowedOrigins { get; set; } = [];
}
