# syntax=docker/dockerfile:1.7
# The site's API: a .NET 10 minimal API with no package dependencies, so the
# image builds on a host with no NuGet feed at all.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY Directory.Build.props global.json ./
COPY src/api/Argus.Site.Api.csproj src/api/
RUN dotnet restore src/api/Argus.Site.Api.csproj

COPY src/api/ src/api/
RUN dotnet publish src/api/Argus.Site.Api.csproj \
        -c Release -o /out --no-restore \
        /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

ENV ASPNETCORE_HTTP_PORTS=8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true \
    DOTNET_EnableDiagnostics=0

# No shell tools are added: the app is also its own health check.
RUN groupadd --gid 10001 argus \
 && useradd --uid 10001 --gid 10001 --no-create-home --shell /usr/sbin/nologin argus \
 && mkdir -p /data \
 && chown -R 10001:10001 /data

WORKDIR /app
COPY --from=build /out ./
USER 10001:10001

EXPOSE 8080
VOLUME ["/data"]
HEALTHCHECK --interval=15s --timeout=3s --start-period=10s --retries=3 \
    CMD ["dotnet", "Argus.Site.Api.dll", "--healthcheck"]

ENTRYPOINT ["dotnet", "Argus.Site.Api.dll"]
