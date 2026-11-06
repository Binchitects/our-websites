# Cloudflare cache configuration

The origin is already built for edge caching:

- HTML: `Cache-Control: public, max-age=0, s-maxage=300` (browser revalidates,
  shared caches may keep it).
- Hashed JS/CSS/fonts: `Cache-Control: public, max-age=31536000, immutable`.
- Public images/icons: `Cache-Control: public, max-age=2592000`.
- `robots.txt`, `sitemap.xml`, web manifest: `Cache-Control: public, max-age=3600`.

Cloudflare does not cache HTML by default. The Cache Rule below makes the
prerendered pages eligible. The `/api/`, `/assets/`, `/healthz` and any path
with a file extension are excluded, so dynamic responses and assets are not
pulled into the HTML rule. Assets keep their own one-year or 30-day headers.

## 1. Create the Cache Rule

Dashboard: **Caching → Cache Rules → Create rule**. If the two hostnames live
in separate Cloudflare zones, create the same rule once in each zone.

**Rule name:** `Cache prerendered HTML`

**When incoming requests match:** *Custom filter expression* (Expression
Editor):

```txt
(http.host eq "argus.binchitects.com" or http.host eq "binchitects.com")
and not starts_with(http.request.uri.path, "/api/")
and not starts_with(http.request.uri.path, "/assets/")
and http.request.uri.path ne "/healthz"
and not http.request.uri.path contains "."
```

**Then:**

| Setting | Value |
| --- | --- |
| Cache eligibility | **Eligible for cache** |
| Edge TTL | **Ignore cache-control header and use this TTL** |
| Edge TTL duration | **2 hours** on Free; **5–15 minutes** on Pro/Business |
| Browser TTL | **Respect origin** |
| Cache key | **Default** |

Leave **Cache by device type** and **Cache deception armor** off. This site
serves the same HTML to every device and cookie, so the default cache key gives
the best hit rate.

Save and deploy the rule. If you have other Cache Rules, put this one at the
**bottom** of the list: Cache Rules stack, and the last matching rule wins. A
later “Bypass cache” rule for the same paths would silently undo HTML caching.

### Why ignore the origin TTL?

The HTML deliberately sends `max-age=0` so browsers do not keep stale HTML
after a deploy. Cloudflare treats `max-age=0` as “do not cache” unless the rule
overrides it. The override applies **only to the edge**; the browser still sees
`max-age=0` and revalidates.

Free plans have a **2-hour minimum** for an Edge Cache TTL override. Pro,
Business and Enterprise can use 5–15 minutes for fresher HTML. In both cases,
purge after every deploy so visitors do not get HTML that points at removed
hashed assets.

## 2. Purge after every deploy

Dashboard: **Caching → Configuration → Purge Cache → Purge by hostname** for
both hostnames, or **Purge Everything**.

Purge immediately after `docker compose up -d --build`. The edge may keep the
old HTML for the TTL above until you do. Cloudflare purge does not clear browser
caches, which is why HTML is still `max-age=0`.

If you use the API:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## 3. Verify the cache actually works

Use two requests and check `cf-cache-status` and `age`:

```bash
curl -sI https://argus.binchitects.com/ | grep -iE 'cf-cache-status|age|cache-control'
sleep 2
curl -sI https://argus.binchitects.com/ | grep -iE 'cf-cache-status|age|cache-control'
```

Expected after the second request:

```http
cache-control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400, stale-if-error=86400
cf-cache-status: HIT
age: 2
```

Also check:

```bash
# Assets should already be HIT, with a long age and cache-control immutable.
curl -sI https://argus.binchitects.com/assets/<hashed-file>.woff2 \
  | grep -iE 'cf-cache-status|age|cache-control'

# Dynamic endpoints must never be cached.
curl -sI https://argus.binchitects.com/api/health \
  | grep -iE 'cf-cache-status|cache-control'
```

`/api/health` should be `DYNAMIC` or `BYPASS`; if it is `HIT`, the rule
expression is wrong — fix it before going further.

If HTML still reports `DYNAMIC` after two requests:

1. Confirm the rule is **Active** and matches the exact hostname (including
   `www` if you use it).
2. Confirm no later matching Cache Rule bypasses HTML (the last match wins).
3. Confirm development mode is off.
4. On a Free plan, if Cache Rules still will not cache `text/html`, use the
   legacy Page Rules fallback below. Disable the Cache Rule first: Cache Rules
   take precedence over Page Rules.

## 4. Free-plan fallback: Page Rules

Free plans have three Page Rules. If Cache Rules remain `DYNAMIC` for HTML,
create these **in this order**:

1. `argus.binchitects.com/api/*`
   - Cache Level: **Bypass**
2. `argus.binchitects.com/*`
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **2 hours**
   - Browser Cache TTL: **Respect Existing Headers**
3. `binchitects.com/*`
   - Cache Level: **Cache Everything**
   - Edge Cache TTL: **2 hours**
   - Browser Cache TTL: **Respect Existing Headers**

Order matters: the `/api/*` bypass must be first. Purge everything and verify
with the same two-request test. Do not leave both a broken Cache Rule and a
Page Rule active; remove the one that is not working.

## 5. Other settings for best performance

- **SSL/TLS → Overview:** **Full (strict)**.
- **SSL/TLS → Edge Certificates:** **Always Use HTTPS** on, **Automatic HTTPS
  Rewrites** on.
- **Speed → Optimization:** **Brotli** on. **Rocket Loader** off — it is
  incompatible with a React module bundle.
- **Network:** HTTP/2 and HTTP/3 on.
- **Caching → Configuration:** Browser Cache TTL **Respect Existing Headers**.
  Do not set a global Browser Cache TTL that overrides the HTML `max-age=0`.
- **Caching → Tiered Cache:** enable it if your plan offers it. It improves
  cache hit ratio and reduces origin load.
- **Caching → Configuration:** Development Mode **off**.

Do not enable **Cache Everything** globally at the zone level. It would cache
`/api/*` and any future dynamic route. Keep the exception list in the Cache
Rule or Page Rule.

## 6. Cache key and query strings

The default key includes the full query string, so `/?utm_source=x` is a
separate cache object from `/`. That is safe for this static site; you can leave
it as is. Ignoring query strings requires a custom cache key and is not
necessary for performance here.

Do not enable **Cache by device type**: the HTML is responsive and identical
across devices, and splitting the key would reduce hit rate.
