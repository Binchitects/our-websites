# Performance

The sites are static files behind nginx. There is no client-side data fetching on
first paint, no third-party script, no analytics and no external font request.
The work below removed the remaining weight and made the origin cheap to hit.

## What changed

**Route-level chunks.** `src/web/src/pages/registry.tsx` lazy-loads each page.
The home route no longer ships the Contact, Security, Brand, Changelog or Code
Arena code. `main.tsx` loads only the chunk for the current path before
hydration; `entry-server.tsx` preloads every page for the prerender pass.

**Subset fonts.** Fontsource packages were removed. The committed `.woff2`
files carry only the glyphs the sites use, split by script and clamped to the
variable ranges the CSS actually asks for. A language preloads two faces rather
than the whole family. See [`FONTS.md`](FONTS.md) for sizes and provenance.

**Caching.** Hashed assets under `/assets/` are `max-age=31536000, immutable`.
HTML stays fresh in the browser but is a shared-cache candidate for five
minutes:

```http
Cache-Control: public, max-age=0, s-maxage=300,
                stale-while-revalidate=86400, stale-if-error=86400
```

The prerendered HTML is small enough to serve from an edge cache; the long
`stale-while-revalidate` window lets Cloudflare answer while it revalidates.

**Real static responses.** Every route is a prerendered file. There is no SPA
fallback that returns `200` for a missing page, and nginx does not spend time
proxying HTML.

## Measured result

Production images, local Traefik/nginx stack, Lighthouse 12 mobile with
simulated slow 4G. These are lab numbers, not field data.

| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | CLS | Transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Argus, English | 97 | 100 | 100 | 100 | 1.9 s | 2.3 s | 0 | 280 KiB |
| Argus, Persian | 96 | 100 | 100 | 100 | 2.0 s | 2.5 s | 0 | 292 KiB |
| Studio, English | 100 | 100 | 100 | 100 | 1.4 s | 1.7 s | 0 | 182 KiB |
| Studio, Persian | 99 | 100 | 100 | 100 | 1.4 s | 1.8 s | 0 | 192 KiB |

Before the font work the Argus English transfer was about 365 KiB and LCP 2.8 s;
the studio was 251 KiB. The remaining payload is the React runtime, the shared
content bundle and the two preloaded font faces.

Reproduce from the repository root:

```bash
cd src/web && npm run build
cd ../binchitects && npm run build
cd ../..
docker compose build web binchitects
docker compose up -d web binchitects

npx lighthouse@12 https://argus.localhost:9443/ \
  --form-factor=mobile --screenEmulation.mobile \
  --throttling-method=simulate \
  --chrome-flags='--headless=new --no-sandbox --ignore-certificate-errors' \
  --only-categories=performance,accessibility,best-practices,seo
```

## Cloudflare

The origin now advertises a five-minute shared-cache TTL, but Cloudflare does
not cache HTML by default. Add a **Cache Rule** for each hostname:

- **When incoming requests match**: the host (`argus.binchitects.com` or
  `binchitects.com`) and the path does not start with `/api/`.
- **Then**: *Eligible for cache*.
- **Edge TTL**: *Use cache-control header if present* (this honors
  `s-maxage=300`).
- **Browser TTL**: *Respect origin* (the HTML revalidates; hashed assets keep
  their year).

Bypass `/api/*` and `/healthz` in the same rule. After a deploy, purge HTML from
the Cloudflare cache: the old HTML points at old hashed asset names, which the
new image no longer contains. A purge plus the five-minute TTL keeps that window
small.

Cloudflare's own speed test measures the full path from its test location, not
the origin. If it still reports a slow first view:

1. Confirm the cache rule is matching (`cf-cache-status: HIT` after the first
   request, not `DYNAMIC`).
2. Purge after a deploy and test twice; the second request should be a hit.
3. Keep **Full (strict)** and **Always Use HTTPS** on. HTTP-to-HTTPS redirects
   are not part of the measured page load once the browser has the HSTS header.
4. Check the Cloudflare dashboard's **Speed → Observatory** for field data, not
   only the synthetic test. Lab scores of 96–100 still leave room for a distant
   network or a cold edge.

The site cannot make a cold first request faster than the origin's TTFB. On this
host nginx answers the prerendered HTML in single-digit milliseconds; the edge
cache removes the round trip for everyone after the first request.
