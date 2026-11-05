# ARGUS — argus.binchitects.com

The public site for **ARGUS**: Argus Arena, Code Arena and the Argus code index.
A React + TypeScript front end served by an unprivileged nginx, and a .NET 10
minimal API behind it. Two images, built from this repository, deployed together.

<p align="center">
  <img src="docs/screenshots/home-light.jpg" alt="The ARGUS home page: warm paper, the seal of Argus, and Newsreader headlines" width="100%">
</p>

```
                ┌──────────────────────┐        ┌──────────────────────┐
  browser ────► │ web  (nginx, :8080)  │ ─────► │ api  (.NET 10, :8080)│
                │ React build + /api   │ proxy  │ contact, releases,   │
                └──────────────────────┘        │ health               │
                                                └──────────┬───────────┘
                                                           ▼
                                                    /data/contact-requests.jsonl
```

The site is designed to run the way the product does: on your own hardware. It
has no external runtime dependency — no analytics, no CDN, no third-party fonts,
no database server. The API has **no NuGet packages**, so it builds without a
package feed; the web image still needs npm for its own dependencies. Once built,
the site runs on an air-gapped network.

---

## Quick start

```bash
cp .env.example .env
docker compose up -d --build
```

Open <http://127.0.0.1:8080> (set `HTTP_PORT` in `.env` if that port is taken).
The site is bound to loopback by default; put a TLS terminator in front for a
public deployment (see below).

```bash
docker compose logs -f          # follow both
docker compose down             # stop
docker compose down -v          # stop and remove the contact-request volume
```

## Screens

| | |
|---|---|
| ![Home, carbon](docs/screenshots/home-dark.jpg) | ![Argus, the index chart](docs/screenshots/argus.jpg) |
| ![Code Arena's proof sheet](docs/screenshots/code-arena.jpg) | ![Security and compliance](docs/screenshots/security.jpg) |
| ![Contact](docs/screenshots/contact.jpg) | ![Platform](docs/screenshots/platform.jpg) |
| ![The brand page](docs/screenshots/brand.jpg) | ![The seal of Argus](docs/screenshots/seal.jpg) |

## Production: argus.binchitects.com

1. **DNS** — an `A` (and `AAAA`, if you have it) record for
   `argus.binchitects.com` pointing at the host. Ports 80 and 443 reachable.
2. **Environment** — copy `.env.example` to `.env`, set at least:

   ```dotenv
   SITE_DOMAIN=argus.binchitects.com
   IP_HASH_SALT=<openssl rand -hex 32>
   ADMIN_TOKEN=<openssl rand -hex 32>          # optional, enables the CSV export
   ```

3. **Up** with the TLS edge:

   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
   ```

   Caddy obtains and renews the certificate for `SITE_DOMAIN` and forwards to
   the web image. The web port stays on loopback; only 80/443 are public.
   See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for an existing reverse proxy,
   certificates of your own, backups and hardening.

## Local development

Prerequisites: .NET 10 SDK, Node 22+, Docker (for images only).

```bash
# terminal 1 — the API
dotnet run --project src/api/Argus.Site.Api.csproj --urls http://127.0.0.1:5080

# terminal 2 — the web app with hot reload
cd src/web
npm ci
npm run dev            # http://127.0.0.1:5173, proxies /api to :5080
```

`make dev-api` and `make dev-web` do the same from the root.

The API stores contact requests under `src/api/data/` in development and at
`/data` in the container. Change it with `Site__DataDirectory`.

## Tests

```bash
cd src/web && npm test          # 12 unit/component tests (Vitest + Testing Library)
dotnet build                    # the API builds with zero packages
tests/smoke/api.sh              # against a running stack (API endpoints)
tests/smoke/web.sh              # against a running stack (static routes + proxy)
make test                       # the first two
make smoke                      # the last two, after `docker compose up -d`
```

The smoke scripts use `curl` only and can be pointed anywhere with `BASE_URL`.

## Configuration

| Variable | Default | What it does |
|---|---|---|
| `SITE_DOMAIN` | `argus.binchitects.com` | Domain Caddy gets a certificate for |
| `HTTP_BIND` | `127.0.0.1` | Address the web port is published on |
| `HTTP_PORT` | `8080` | Published web port |
| `IP_HASH_SALT` | empty | Salt for the stored hash of a request's address |
| `ADMIN_TOKEN` | empty | Enables `GET /api/admin/leads`; empty = disabled (404) |
| `CONTACT_WEBHOOK_URL` | empty | Optional Slack/Teams/CRM webhook for each enquiry |
| `GITHUB_TOKEN` | empty | Lifts GitHub's anonymous rate limit on the changelog |
| `CONTACT_PERMIT_LIMIT` | `5` | Contact requests per address per window |
| `CONTACT_WINDOW_MINUTES` | `10` | Length of that window |
| `IMAGE_TAG` | `local` | Tag for the two built images |

All settings are standard ASP.NET configuration, so anything under `Site:` can
also be set with `Site__Name=value` (for example `Site__ContactPermitLimit=3`).

## API

| Method | Path | Notes |
|---|---|---|
| `GET` | `/healthz` | Liveness only; no detail |
| `GET` | `/api/health` | JSON: status, version, per-check health |
| `POST` | `/api/contact` | Validate, store, optionally forward; `201`, `400`, `429` |
| `GET` | `/api/releases` | Cached GitHub releases, built-in fallback |
| `GET` | `/api/admin/leads?limit=200` | CSV; needs `X-Admin-Token`; disabled unless configured |

Contact requests are appended as one JSON object per line to
`/data/contact-requests.jsonl` (durable append, file locked per write). Addresses
are stored only as a truncated SHA-256 hash. One damaged line never hides the
others.

Back up the volume:

```bash
docker compose exec -T api cat /data/contact-requests.jsonl > contact-requests-$(date +%F).jsonl
# or
docker run --rm -v argus-site_site-data:/data -v "$PWD":/backup alpine \
  tar -czf /backup/site-data-$(date +%F).tar.gz -C /data .
```

## Repository

```
src/
  api/                 .NET 10 minimal API (no packages)
    Configuration/     SiteOptions, bound from the "Site" section
    Data/              the append-only contact store
    Features/          contact, releases, admin, health endpoints
    Releases/          GitHub feed with cache and fallback
    Dockerfile
  web/                 React 19 + TypeScript + Vite
    src/components/    layout, UI, brand mark and seal, product plates
    src/pages/         home, platform, code arena, argus, security,
                       changelog, contact, privacy, brand, 404
    src/lib/           content, SEO, helpers
    public/brand/      the mark and seal as downloadable SVG
    scripts/           route-meta prerender, sitemap, robots
    Dockerfile, nginx.conf
tests/smoke/           curl checks for a running stack
deploy/caddy/          Caddyfile for automatic TLS
docker-compose.yml     the two images
docker-compose.prod.yml adds the TLS edge
docs/DEPLOYMENT.md     DNS, TLS, backups, updates, hardening
```

## Design

The site is set as printed matter for a private machine: warm paper, ink rules,
one iris blue, numbered chapters, marginal notes and figure captions. Newsreader
carries the claims; IBM Plex Sans and Mono carry the record. There are no
gradients, glows or glass in the interface.

The identity is drawn, not traced. The **mark** is a roundel — an ink disc, a
paper eye, one blue iris and a dial of ticks — so it holds at 16px and at two
metres. The **seal** is the site's large illustration: a 180-tick dial, a lens
diaphragm, and an iris cut in 150 radial lines. The favicon, app icons and
social image are generated from the mark and seal.

Product moments are printed rather than screenshotted: a radial index chart of
the Argus tools, a system-section schematic of the stack, a proof sheet from
Code Arena's IDE, the agent's trace, and one inverted spread for Argus. Every
page has route-specific meta in its built HTML for crawlers and link previews,
and a sitemap is generated at build time.

## Brand

The mark and seal are files as well as components:

- [`src/web/public/brand/argus-mark.svg`](src/web/public/brand/argus-mark.svg)
- [`src/web/public/brand/argus-seal.svg`](src/web/public/brand/argus-seal.svg)
- [`src/web/public/favicon.svg`](src/web/public/favicon.svg)
- [`src/web/public/og.png`](src/web/public/og.png)

`/brand` on the site is the specimen page: sizes, the seal, the lockup, the
palette and the usage rules.

Accessibility: keyboard-first, visible focus, a skip link, labelled fields,
error text tied with `aria-describedby`, native details for the FAQ, a
prefers-reduced-motion path, and text pairs that meet WCAG AA on their surfaces.

## Licence

The site's own source is not the product's source. Argus Arena, Argus, Code
Arena and their marks are trademarks of Binchitects. The product is dual
licensed under AGPL-3.0-only or commercially — see the
[product's licensing](https://github.com/Binchitects/argus/blob/main/LICENSING.md).
