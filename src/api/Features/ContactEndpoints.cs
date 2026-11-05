using System.Net.Mail;
using System.Text.Json;
using System.Text.RegularExpressions;
using Argus.Site.Api.Configuration;
using Argus.Site.Api.Data;
using Microsoft.Extensions.Options;

namespace Argus.Site.Api.Features;

/// <summary>What the contact form sends. Everything is optional at the binding layer,
/// so one missing field produces one clear message instead of a failed parse.</summary>
public sealed record ContactRequest(
    string? Name,
    string? Email,
    string? Company,
    string? Topic,
    string? Message,
    bool Consent = false,
    /// <summary>Hidden field no person fills in; a bot that does is answered as usual and discarded.</summary>
    string? Website = null);

public sealed record ContactAccepted(string Id, DateTimeOffset ReceivedAt);

/// <summary>The contact form's endpoint: validate, store, tell the team, and answer plainly.</summary>
public static partial class ContactEndpoints
{
    public const string RateLimitPolicy = "contact";

    /// <summary>The subjects the form offers. The web app sends one of these keys.</summary>
    public static readonly IReadOnlyDictionary<string, string> Topics = new Dictionary<string, string>(StringComparer.Ordinal)
    {
        ["walkthrough"] = "Book a walkthrough",
        ["license"] = "Commercial licence",
        ["deployment"] = "Deployment and architecture",
        ["security"] = "Security and compliance review",
        ["partnership"] = "Partnership or reseller",
        ["other"] = "Something else",
    };

    private static readonly Regex UrlPattern = new(@"https?://", RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapPost("/contact", async (
                ContactRequest request,
                HttpContext http,
                ContactStore store,
                IOptions<SiteOptions> options,
                IHttpClientFactory httpClientFactory,
                ILogger<Program> logger,
                CancellationToken cancellationToken) =>
            {
                var errors = Validate(request);
                if (errors.Count > 0)
                    return Results.ValidationProblem(errors);

                // A filled honeypot is a bot. Answer as though it worked, store nothing.
                if (!string.IsNullOrWhiteSpace(request.Website))
                {
                    logger.LogInformation("Discarded a contact request that filled the honeypot.");
                    return Results.Accepted(value: new ContactAccepted(Guid.NewGuid().ToString("n"), DateTimeOffset.UtcNow));
                }

                var receivedAt = DateTimeOffset.UtcNow;
                var record = new ContactRequestRecord(
                    Guid.NewGuid().ToString("n"),
                    // The two values Validate has already proven present.
                    request.Name!.Trim(),
                    request.Email!.Trim().ToLowerInvariant(),
                    string.IsNullOrWhiteSpace(request.Company) ? null : request.Company.Trim(),
                    request.Topic!,
                    request.Message!.Trim(),
                    store.HashAddress(http.Connection.RemoteIpAddress?.ToString()),
                    Truncate(http.Request.Headers.UserAgent.ToString(), 300),
                    receivedAt);

                await store.AddAsync(record, cancellationToken);
                logger.LogInformation("Contact request {Id} received for topic {Topic}.", record.Id, record.Topic);

                await NotifyAsync(httpClientFactory, options.Value, record, logger, cancellationToken);
                return Results.Created($"/api/contact/{record.Id}", new ContactAccepted(record.Id, receivedAt));
            })
            .RequireRateLimiting(RateLimitPolicy)
            .WithName("SubmitContactRequest")
            .WithSummary("Send the site's contact form.")
            .WithDescription("Stores the request and optionally forwards it to the configured webhook.")
            .Produces<ContactAccepted>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .Produces(StatusCodes.Status429TooManyRequests);

        return routes;
    }

    /// <summary>The form's rules, in one place, with the words the page shows beside each field.</summary>
    public static Dictionary<string, string[]> Validate(ContactRequest request)
    {
        var errors = new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase);

        var name = request.Name?.Trim() ?? "";
        if (name.Length == 0)
            errors["name"] = ["Please tell us your name."];
        else if (name.Length < 2)
            errors["name"] = ["That name looks too short."];
        else if (name.Length > 120)
            errors["name"] = ["Please keep your name under 120 characters."];

        var email = request.Email?.Trim() ?? "";
        if (email.Length == 0)
            errors["email"] = ["Please add an email address we can reply to."];
        else if (email.Length > 254 || !IsEmail(email))
            errors["email"] = ["That does not look like an email address."];

        if (!string.IsNullOrWhiteSpace(request.Company) && request.Company.Trim().Length > 160)
            errors["company"] = ["Please keep the company name under 160 characters."];

        if (string.IsNullOrWhiteSpace(request.Topic) || !Topics.ContainsKey(request.Topic))
            errors["topic"] = ["Choose what your message is about."];

        var message = request.Message?.Trim() ?? "";
        if (message.Length == 0)
            errors["message"] = ["Tell us a little about what you need."];
        else if (message.Length < 20)
            errors["message"] = ["A sentence or two helps us answer well (at least 20 characters)."];
        else if (message.Length > 4000)
            errors["message"] = ["Please keep the message under 4,000 characters."];
        else if (UrlPattern.Matches(message).Count > 4)
            errors["message"] = ["That message has too many links. Send the detail in a shorter form."];

        if (!request.Consent)
            errors["consent"] = ["Please agree to us using your details to reply."];

        return errors;
    }

    private static bool IsEmail(string value)
    {
        try
        {
            var address = new MailAddress(value);
            var at = value.LastIndexOf('@');
            var dot = value.LastIndexOf('.');
            return address.Address == value
                && at > 0
                && dot > at + 1
                && dot < value.Length - 1
                && !value.Contains(' ');
        }
        catch (FormatException)
        {
            return false;
        }
    }

    private static async Task NotifyAsync(
        IHttpClientFactory factory,
        SiteOptions options,
        ContactRequestRecord record,
        ILogger logger,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(options.ContactWebhookUrl))
            return;

        try
        {
            using var client = factory.CreateClient();
            client.Timeout = TimeSpan.FromSeconds(5);
            var payload = JsonSerializer.Serialize(new
            {
                text = $"New ARGUS site enquiry: {Topics.GetValueOrDefault(record.Topic, record.Topic)}",
                id = record.Id,
                name = record.Name,
                email = record.Email,
                company = record.Company,
                topic = record.Topic,
                message = record.Message,
                receivedAt = record.CreatedAt,
            });
            using var content = new StringContent(payload, System.Text.Encoding.UTF8, "application/json");
            using var response = await client.PostAsync(options.ContactWebhookUrl, content, cancellationToken);
            if (!response.IsSuccessStatusCode)
                logger.LogWarning("The contact webhook answered {Status}.", (int)response.StatusCode);
        }
        catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException)
        {
            // The request is safely stored; a webhook that is down must not turn into a
            // failed form for the person who sent it.
            logger.LogWarning(ex, "The contact webhook could not be reached.");
        }
    }

    private static string? Truncate(string? value, int length)
        => string.IsNullOrWhiteSpace(value) ? null : value.Length <= length ? value : value[..length];
}
