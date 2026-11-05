using Argus.Site.Api.Configuration;
using Argus.Site.Api.Data;
using Microsoft.Extensions.Options;

namespace Argus.Site.Api.Features;

/// <summary>
/// Reading back what the contact form collected, for the team. Off unless
/// Site:AdminToken is set, and never cached anywhere.
/// </summary>
public static class AdminEndpoints
{
    public static IEndpointRouteBuilder MapAdminEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/admin/leads", async (
                HttpContext http,
                ContactStore store,
                IOptions<SiteOptions> options,
                ILogger<Program> logger,
                int? limit,
                CancellationToken cancellationToken) =>
            {
                var token = options.Value.AdminToken;
                if (string.IsNullOrWhiteSpace(token))
                    return Results.NotFound();

                var offered = http.Request.Headers["X-Admin-Token"].ToString();
                if (!CryptographicEquals(offered, token))
                {
                    logger.LogWarning("Refused a lead export from {Address}.", http.Connection.RemoteIpAddress);
                    return Results.Unauthorized();
                }

                var records = await store.ListAsync(limit ?? 200, cancellationToken);
                http.Response.Headers.CacheControl = "no-store";
                http.Response.Headers.ContentDisposition = "attachment; filename=\"argus-site-leads.csv\"";
                return Results.Text(ToCsv(records), "text/csv; charset=utf-8");
            })
            .WithName("ExportContactRequests")
            .WithSummary("Export stored contact requests as CSV (operator only).")
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized)
            .Produces(StatusCodes.Status404NotFound);

        return routes;
    }

    private static bool CryptographicEquals(string offered, string expected)
    {
        var a = System.Text.Encoding.UTF8.GetBytes(offered);
        var b = System.Text.Encoding.UTF8.GetBytes(expected);
        return a.Length == b.Length && System.Security.Cryptography.CryptographicOperations.FixedTimeEquals(a, b);
    }

    private static string ToCsv(IEnumerable<ContactRequestRecord> records)
    {
        var builder = new System.Text.StringBuilder();
        builder.AppendLine("id,received_at,name,email,company,topic,message,ip_hash,user_agent");
        foreach (var record in records)
        {
            builder
                .Append(Quote(record.Id)).Append(',')
                .Append(Quote(record.CreatedAt.ToString("O"))).Append(',')
                .Append(Quote(record.Name)).Append(',')
                .Append(Quote(record.Email)).Append(',')
                .Append(Quote(record.Company)).Append(',')
                .Append(Quote(record.Topic)).Append(',')
                .Append(Quote(record.Message)).Append(',')
                .Append(Quote(record.IpHash)).Append(',')
                .Append(Quote(record.UserAgent))
                .AppendLine();
        }
        return builder.ToString();
    }

    private static string Quote(string? value)
        => value is null ? "" : $"\"{value.Replace("\"", "\"\"")}\"";
}
