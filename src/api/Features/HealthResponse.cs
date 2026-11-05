using System.Text.Json;
using Argus.Site.Api.Configuration;
using Argus.Site.Api.Data;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Options;

namespace Argus.Site.Api.Features;

/// <summary>The JSON answer to a readiness probe: what is up, which build it is, and when.</summary>
public static class HealthResponse
{
    public static async Task WriteAsync(HttpContext context, HealthReport report)
    {
        var site = context.RequestServices.GetRequiredService<IOptions<SiteOptions>>().Value;
        context.Response.ContentType = "application/json; charset=utf-8";
        await context.Response.WriteAsync(JsonSerializer.Serialize(new
        {
            status = report.Status.ToString().ToLowerInvariant(),
            version = site.Version,
            time = DateTimeOffset.UtcNow,
            checks = report.Entries.ToDictionary(
                entry => entry.Key,
                entry => new { status = entry.Value.Status.ToString().ToLowerInvariant() }),
        }));
    }
}

/// <summary>Readiness of the store behind the contact form, not of the process.</summary>
public sealed class ContactStoreHealthCheck(ContactStore store) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
        => await store.CanReachAsync(cancellationToken)
            ? HealthCheckResult.Healthy("The contact store answers.")
            : HealthCheckResult.Unhealthy("The contact store cannot be reached.");
}
