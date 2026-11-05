using System.Threading.RateLimiting;
using Argus.Site.Api.Configuration;
using Argus.Site.Api.Data;
using Argus.Site.Api.Features;
using Argus.Site.Api.Releases;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Diagnostics.HealthChecks;

// The container health check, without a shell or curl: ask our own liveness
// endpoint and answer with the process's exit code.
if (args.Contains("--healthcheck"))
{
    try
    {
        var port = Environment.GetEnvironmentVariable("ASPNETCORE_HTTP_PORTS")?.Split(';')[0] ?? "8080";
        using var client = new HttpClient { Timeout = TimeSpan.FromSeconds(2) };
        using var response = client.GetAsync($"http://127.0.0.1:{port}/healthz").GetAwaiter().GetResult();
        return response.IsSuccessStatusCode ? 0 : 1;
    }
    catch
    {
        return 1;
    }
}

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(kestrel => kestrel.AddServerHeader = false);

builder.Services
    .AddOptions<SiteOptions>()
    .Bind(builder.Configuration.GetSection(SiteOptions.SectionName))
    .Validate(options => !string.IsNullOrWhiteSpace(options.DataDirectory), "Site:DataDirectory is required.")
    .Validate(options => options.ContactPermitLimit > 0, "Site:ContactPermitLimit must be greater than zero.")
    .ValidateOnStart();

builder.Services.AddSingleton<ContactStore>();
builder.Services.AddSingleton<ReleaseFeed>();
builder.Services.AddProblemDetails();
builder.Services.AddHttpClient();
builder.Services.AddHealthChecks()
    .AddCheck<ContactStoreHealthCheck>("contact-store", tags: ["ready"]);

// Only private networks may set the forwarding headers: the site is reached through
// the web image's nginx, never through this process directly.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
    foreach (var network in new[] { "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "127.0.0.0/8", "::1/128" })
        options.KnownIPNetworks.Add(System.Net.IPNetwork.Parse(network));
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy(ContactEndpoints.RateLimitPolicy, httpContext =>
    {
        var site = httpContext.RequestServices.GetRequiredService<Microsoft.Extensions.Options.IOptions<SiteOptions>>().Value;
        return RateLimitPartition.GetFixedWindowLimiter(
            httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = site.ContactPermitLimit,
                Window = TimeSpan.FromMinutes(site.ContactWindowMinutes),
                QueueLimit = 0,
                AutoReplenishment = true,
            });
    });
    options.OnRejected = async (context, cancellationToken) =>
    {
        var retryAfter = TimeSpan.FromMinutes(10);
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var metadata))
            retryAfter = metadata;

        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        context.HttpContext.Response.Headers.RetryAfter = ((int)Math.Ceiling(retryAfter.TotalSeconds)).ToString();
        await context.HttpContext.Response.WriteAsJsonAsync(
            new
            {
                type = "https://argus.binchitects.com/errors/too-many-requests",
                title = "Too many requests",
                status = 429,
                detail = "Please wait a few minutes before sending another message.",
                retryAfterSeconds = (int)Math.Ceiling(retryAfter.TotalSeconds),
            },
            cancellationToken);
    };
});

var allowedOrigins = builder.Configuration.GetSection("Site:AllowedOrigins").Get<string[]>() ?? [];
if (allowedOrigins.Length > 0)
{
    builder.Services.AddCors(options => options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
}

var app = builder.Build();

app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseStatusCodePages();
app.Use(async (context, next) =>
{
    context.Response.Headers["X-Content-Type-Options"] = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    await next();
});

if (allowedOrigins.Length > 0)
    app.UseCors();

app.UseRateLimiter();

app.MapHealthChecks("/healthz");
app.MapHealthChecks("/api/health", new Microsoft.AspNetCore.Diagnostics.HealthChecks.HealthCheckOptions
{
    ResponseWriter = HealthResponse.WriteAsync,
});

var api = app.MapGroup("/api");
api.MapContactEndpoints();
api.MapReleaseEndpoints();
api.MapAdminEndpoints();

app.Run();
return 0;

/// <summary>The entry point, named so a test or a tool can refer to the assembly.</summary>
public partial class Program;
