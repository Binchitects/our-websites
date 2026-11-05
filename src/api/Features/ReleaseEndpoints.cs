using Argus.Site.Api.Releases;

namespace Argus.Site.Api.Features;

/// <summary>The changelog page's data: the project's releases, newest first.</summary>
public static class ReleaseEndpoints
{
    public static IEndpointRouteBuilder MapReleaseEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/releases", async (ReleaseFeed feed, CancellationToken cancellationToken) =>
            {
                var result = await feed.GetAsync(cancellationToken);
                // Cached upstream; the browser may reuse it briefly too.
                return Results.Json(result, statusCode: StatusCodes.Status200OK);
            })
            .WithName("ListReleases")
            .WithSummary("List ARGUS releases for the changelog page.")
            .Produces<ReleaseFeedResult>();

        return routes;
    }
}
