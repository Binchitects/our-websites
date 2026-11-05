# Deploying the site

The site is two images with no runtime dependency: `web` (the React build served
by unprivileged nginx, proxying `/api` to `api`) and `api` (.NET 10). This page
covers a real deployment at `argus.binchitects.com`, backups, updates and
hardening.

## 1. The host

- Linux, Docker Engine 24+ and the Compose plugin.
- 1 vCPU / 512 MB RAM is enough; the images are small and the API is idle.
- Ports 80 and 443 reachable if Caddy terminates TLS. If a load balancer or an
  existing reverse proxy does, only the internal web port is needed.
- A DNS `A` record for `argus.binchitects.com` pointing at the host (an `AAAA`
  too if the host has IPv6). Caddy needs the record to answer the ACME
  challenge; it cannot get a certificate for a name that does not resolve here.

## 2. First deploy with automatic TLS

```bash
git clone <this repository> argus-site && cd argus-site
cp .env.example .env
```

Edit `.env`:

```dotenv
SITE_DOMAIN=argus.binchitects.com
IP_HASH_SALT=<openssl rand -hex 32>
ADMIN_TOKEN=<openssl rand -hex 32>
CONTACT_WEBHOOK_URL=            # optional
GITHUB_TOKEN=                   # optional, for the changelog feed
```

Then:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose ps
curl -fsS https://argus.binchitects.com/api/health
```

Caddy stores certificates in the `caddy-data` volume. Keep it: removing it makes
Caddy ask Let's Encrypt again, and there are rate limits.

**TLS somewhere else instead.** Skip `docker-compose.prod.yml` and point your own
terminator at `127.0.0.1:8080` (or set `HTTP_BIND=0.0.0.0` on a trusted
network). The web image already sends `X-Forwarded-Proto` to the API and trusts
forwarded headers only from private networks, so keep the API unpublished.

## 3. What runs

| Container | User | Port | Writes | Health |
|---|---|---|---|---|
| `argus-site-web-1` | `nginx` (uid 100) | 8080 | `/tmp` only | `GET /healthz` |
| `argus-site-api-1` | `10001:10001` | 8080, internal | `/data` volume | `GET /healthz` |
| `argus-site-edge-1` (prod) | image default | 80, 443 | Caddy volumes | Caddy's own |

Both app containers run read-only roots with all Linux capabilities dropped and
`no-new-privileges`. The API is never published; only the web port (loopback by
default) and, with the prod file, 80/443.

## 4. Data

Contact requests live in the `site-data` volume at
`/data/contact-requests.jsonl`: one JSON object per line, appended with a file
lock and flushed to disk before the request returns. There is no database to
migrate or vacuum.

**Backup**

```bash
docker run --rm \
  -v argus-site_site-data:/data:ro \
  -v "$PWD":/backup \
  alpine tar -czf /backup/site-data-$(date +%F).tar.gz -C /data .
```

**Restore**

```bash
docker compose stop api
docker run --rm -v argus-site_site-data:/data -v "$PWD":/backup alpine \
  sh -c 'rm -f /data/*.jsonl && tar -xzf /backup/site-data-YYYY-MM-DD.tar.gz -C /data'
docker compose start api
```

**Export without touching the volume** (set `ADMIN_TOKEN` first):

```bash
curl -fsS -H "X-Admin-Token: $ADMIN_TOKEN" \
  "https://argus.binchitects.com/api/admin/leads?limit=1000" -o leads.csv
```

The endpoint is off (404) when `ADMIN_TOKEN` is empty. The token is compared in
constant time, and the response is `no-store`.

## 5. Updates

```bash
git pull
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

The web image is replaced with no gap in serving; Caddy keeps certificates. The
API restarts in a second. No data migration is involved.

Roll back by checking out the previous commit and repeating the command; the
data file is forward compatible by design.

## 6. Configuration reference

| Variable | Default | Notes |
|---|---|---|
| `SITE_DOMAIN` | `argus.binchitects.com` | Used by the Caddyfile |
| `HTTP_BIND` | `127.0.0.1` | Set to `0.0.0.0` only behind a trusted network |
| `HTTP_PORT` | `8080` | Host port for the web image |
| `IP_HASH_SALT` | empty | Set it; makes stored hashes non-linkable outside this deployment |
| `ADMIN_TOKEN` | empty | Enables the CSV export; empty disables it |
| `CONTACT_WEBHOOK_URL` | empty | JSON POST per enquiry, 5 s timeout, failures only logged |
| `GITHUB_TOKEN` | empty | Raises GitHub's 60 requests/hour anonymous limit |
| `CONTACT_PERMIT_LIMIT` | `5` | Per address, per window |
| `CONTACT_WINDOW_MINUTES` | `10` | Window length |
| `IMAGE_TAG` | `local` | Use a registry tag for a release |

Anything else under ASP.NET's `Site:` section can be set with
`Site__PropertyName`. The full set is in `src/api/Configuration/SiteOptions.cs`.

## 7. Security notes

- **CSP** is set by nginx (`src/web/nginx.conf`). Scripts come only from this
  origin; the theme script is a file for that reason. Styles allow inline
  because React sets style attributes. No frames, no objects, forms only to
  this origin.
- **Forwarded headers** are accepted only from private networks, so a direct
  request to the API cannot spoof an address for the rate limiter.
- **Rate limiting** is a fixed window per address on `POST /api/contact`.
  Rejections answer `429` with `Retry-After` and a JSON body.
- **Honeypot**: a hidden `website` field. A bot that fills it gets a normal
  `202` and nothing is stored.
- **Spam heuristic**: more than four links in a message is refused with a
  helpful message.
- **Contact data** is minimised: the address is hashed, the user agent is
  truncated, and nothing else is collected. See `/privacy` on the site.
- **HSTS** is sent by nginx. It is ignored over plain HTTP, and effective once
  the site is behind TLS. Remove the header from `nginx.conf` if the site will
  ever be served over HTTP on a real hostname.
- **Containers**: read-only roots, `cap_drop: ALL`, `no-new-privileges`,
  non-root users, and only `/data` and `/tmp` writable.

## 8. Troubleshooting

**`502 Bad Gateway` on `/api/...`** — the API is not up or not healthy:
`docker compose ps`, `docker compose logs api`. The web image resolves it by the
service name `api`; keep both on the `internal` network.

**The API exits with a permissions error on `/data`** — a bind mount was used
without matching ownership. The named volume initialises itself; for a bind
mount, `chown -R 10001:10001 ./data`.

**Caddy keeps retrying the certificate** — DNS not propagated, port 80 closed,
or the domain is proxied through a CDN that terminates TLS. Check
`docker compose logs edge`.

**The changelog shows the built-in list** — GitHub was unreachable from the
container, or the anonymous rate limit was hit. Set `GITHUB_TOKEN`. The page
falls back on purpose and retries after a minute.

**Tests fail with 429** — the smoke script sends several contact requests from
one address. Wait for the window, or raise `CONTACT_PERMIT_LIMIT` on a test
deployment.
