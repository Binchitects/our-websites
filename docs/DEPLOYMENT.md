# Deploying the two sites

One Compose stack: **Traefik** terminates TLS with a certificate you supply,
routes each hostname to its own web image, and redirects HTTP to HTTPS.
**binchitects** serves the studio page, **web** serves Argus and proxies `/api`
to **api** (.NET 10). There is no certificate authority, no ACME account and no
external runtime dependency.

A deployment is three things: DNS, a certificate covering both names, and a
`.env`. Then `docker compose up`.

## 1. DNS

Point these at the host, with `A` records (and `AAAA` if the host has IPv6):

- `argus.binchitects.com` — the Argus host (`ARGUS_DOMAIN`)
- `binchitects.com` — the studio apex (`BINCHIECTS_DOMAIN`)

Ports 80 and 443 must reach the host. Traefik redirects all port-80 requests to
HTTPS; it does not need port 80 for a certificate challenge.

## 2. The certificate

Put one certificate and key on the host. Both names must be in the certificate
as SANs (a wildcard for `*.binchitects.com` alone does **not** cover the apex):

```bash
ls deploy/tls/fullchain.pem deploy/tls/privkey.pem
openssl x509 -in deploy/tls/fullchain.pem -noout -subject -ext subjectAltName
```

Expected SANs:

```
DNS:argus.binchitects.com, DNS:binchitects.com
```

Point Traefik elsewhere with `TLS_CERT_FILE` and `TLS_KEY_FILE` if the files live
outside the repository; relative paths are resolved from the compose file.
The private key is read by the edge container through a read-only bind mount.

There is no automatic renewal. Replace the two files and restart the edge
(`docker compose restart edge`). Do this before expiry, from whatever issued
the certificate.

### Behind Cloudflare

If the DNS record is proxied (orange cloud), Cloudflare should connect to the
origin over **443**:

- **SSL/TLS → Overview**: choose **Full (strict)**. Use **Full** only if the
  origin certificate is self-signed.
- **Cloudflare Tunnel**: set the public hostname's service to
  `https://localhost:443` (turn on *No TLS Verify* if the origin uses a
  self-signed or Cloudflare Origin CA certificate).
- **Origin Rules**: point the origin port at 443.
- A **Cloudflare Origin Certificate** is trusted by Cloudflare in Full (strict)
  mode even though public clients do not trust it; put its certificate and key
  at the paths in `.env` and restart the edge.

The edge is also tolerant of a Cloudflare proxy that still reaches the origin
over HTTP (`Flexible`, or a tunnel pointed at port 80). Cloudflare sends
`CF-Ray` on every proxied request; those HTTP requests are served directly
instead of redirected, so the browser does not loop. Direct HTTP visitors are
still redirected to HTTPS. **Full (strict) remains the recommended mode**, since
it encrypts the Cloudflare-to-origin hop too.

Cloudflare's **Always Use HTTPS** can stay on. Purge the cache after changing
the mode.

#### Cache the prerendered HTML

The origin sends `Cache-Control: public, max-age=0, s-maxage=300` for HTML and a
one-year immutable header for hashed assets. Cloudflare does not cache HTML by
default, so add a **Cache Rule** covering both hostnames (one per zone if they
are separate zones):

- **Expression**: the host matches (`argus.binchitects.com` or
  `binchitects.com`); the path does not start with `/api/` or `/assets/`, is not
  `/healthz`, and contains no file extension.
- **Cache eligibility**: *Eligible for cache*.
- **Edge TTL**: *Ignore cache-control header and use this TTL* — 2 hours on
  Free, 5–15 minutes on Pro and above. The browser still sees `max-age=0`
  because browser TTL is respected.
- **Browser TTL**: *Respect origin TTL* — the HTML revalidates, while hashed
  assets keep their year.

The complete guide, including the Free-plan Page Rules fallback, is
[`CLOUDFLARE.md`](CLOUDFLARE.md).

Keep `/api/*`, `/assets/*` and `/healthz` out of the rule. After a deploy,
always purge the HTML: the old document points at old hashed asset names, which
the new image no longer contains. On Free the edge TTL is two hours, so a purge
is not optional. Check the result with `curl -skI https://argus.binchitects.com/`
and look for `cf-cache-status: HIT` on the second request.

#### 526 Invalid SSL certificate with Full (strict)

**Always Use HTTPS** only redirects visitors from HTTP to HTTPS at Cloudflare's
edge. It does not decide how Cloudflare talks to the origin; **SSL/TLS mode**
does.

- **Flexible** works because Cloudflare connects to the origin over **HTTP port
  80**, so there is no origin certificate to validate. The Cloudflare-to-origin
  hop is unencrypted, including contact-form submissions. Do not leave it here.
- **Full (strict)** connects over **HTTPS** and validates the origin
  certificate. A self-signed certificate, the local `.localhost` certificate
  from this repository, an expired certificate, a missing SAN, or an incomplete
  chain produces Cloudflare error **526 Invalid SSL certificate**.

Check what the server is actually presenting:

```bash
openssl x509 -in deploy/tls/fullchain.pem -noout \
  -subject -issuer -dates -ext subjectAltName

docker compose logs edge | tail -40
```

If the subject/SAN contains `binchitects.localhost` or `*.localhost`, the
deployment is still using the local trial certificate.

**Fix (recommended): a Cloudflare Origin CA certificate.**

1. Cloudflare dashboard → **SSL/TLS → Origin Server → Create Certificate**.
2. Add both names: `binchitects.com` and `*.binchitects.com` (the wildcard does
   not cover the apex). Add `www.binchitects.com` if you use it.
3. Choose RSA 2048 or ECDSA and a 15-year validity.
4. Save the certificate and key on the server at the paths in `.env`
   (`TLS_CERT_FILE` / `TLS_KEY_FILE`). The key must be readable by the Traefik
   process; `chmod 600` is correct for root-owned files.
5. Recreate the edge:

   ```bash
   docker compose up -d --force-recreate edge
   ```

6. Verify the origin certificate from the server:

   ```bash
   openssl s_client -connect 127.0.0.1:443 -servername binchitects.com \
     </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
   ```

   The issuer should be `CloudFlare Origin SSL Certificate Authority`, and both
   names must be in the SAN.

7. Set **SSL/TLS → Overview** to **Full (strict)**, keep **Always Use HTTPS** on,
   set minimum TLS to 1.2, and purge the Cloudflare cache.

If you cannot use a valid certificate yet, use **Full** (not strict), which
encrypts the Cloudflare-to-origin hop but skips validation. It is temporary;
**Flexible** should not be left enabled.

If you already installed a **Cloudflare Origin CA** certificate and still see
526, the certificate is probably not the one Traefik is serving:

```bash
# What is in the files named by .env?
openssl x509 -in deploy/tls/fullchain.pem -noout \
  -subject -issuer -dates -ext subjectAltName

# What is Traefik actually presenting on 443?
openssl s_client -connect 127.0.0.1:443 -servername argus.binchitects.com \
  </dev/null 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates -ext subjectAltName
```

The second command must show the Origin CA issuer and the exact hostname in
the SAN. If it shows `binchitects.localhost`, `TRAEFIK DEFAULT CERT`, or a
certificate for only one of the two names, the bind mount or the certificate
contents are wrong.

Also check:

- **SAN coverage.** The Origin CA certificate must include
  `binchitects.com` and `argus.binchitects.com`; `*.binchitects.com` covers
  `argus`, but not the apex.
- **Key pair.** The key in `TLS_KEY_FILE` must match the certificate. A
  mismatch makes Traefik fall back to its default certificate.
- **Reload.** Recreate the edge after replacing files:
  `docker compose up -d --force-recreate edge`.
- **DNS.** Both hostnames must reach the same origin. A stale DNS record for
  `argus` can make only that hostname fail.
- **Tunnel.** If Cloudflare reaches the stack through `cloudflared`, set the
  tunnel origin to `https://localhost:443` and enable **No TLS Verify** for an
  Origin CA certificate; `cloudflared` validates against the system trust
  store, which does not contain the Cloudflare Origin CA.

An **edge certificate** from Cloudflare (the public certificate visitors see)
cannot be installed on the origin: Cloudflare does not export its private key.
The certificate needed for Full (strict) is the one under **SSL/TLS → Origin
Server → Create Certificate**.


Check the origin directly from the server:

```bash
curl -skI https://127.0.0.1/ -H 'Host: argus.binchitects.com'
# 200 is correct; 308 to the same URL means the HTTPS port is not reaching websecure
```

## 3. First deploy

```bash
git clone <this repository> argus-site && cd argus-site
cp .env.example .env
```

Edit `.env`:

```dotenv
ARGUS_DOMAIN=argus.binchitects.com
BINCHIECTS_DOMAIN=binchitects.com
TLS_CERT_FILE=./deploy/tls/fullchain.pem
TLS_KEY_FILE=./deploy/tls/privkey.pem
HTTP_PORT=80
HTTPS_PORT=443
IP_HASH_SALT=<openssl rand -hex 32>
ADMIN_TOKEN=<openssl rand -hex 32>          # optional, enables the CSV export
```

Then:

```bash
docker compose up -d --build      # or `docker compose up --build` in the foreground
docker compose ps
curl -fsS https://argus.binchitects.com/api/health
curl -fsS https://binchitects.com/ >/dev/null
```

Traefik obtains nothing and stores no state; the certificate is the one you
mounted. The API is never published: only Traefik's 80/443 are.

**Renew or replace the certificate**

```bash
# copy the new fullchain.pem and privkey.pem into place, then:
docker compose restart edge
```

## 4. A local trial

A certificate with local names lets you run the real stack without DNS:

```bash
openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
  -keyout deploy/tls/privkey.pem -out deploy/tls/fullchain.pem \
  -subj "/CN=binchitects.localhost" \
  -addext "subjectAltName=DNS:argus.localhost,DNS:binchitects.localhost"

cat > .env <<'ENV'
ARGUS_DOMAIN=argus.localhost
BINCHIECTS_DOMAIN=binchitects.localhost
TLS_CERT_FILE=./deploy/tls/fullchain.pem
TLS_KEY_FILE=./deploy/tls/privkey.pem
HTTP_PORT=9080
HTTPS_PORT=9443
IP_HASH_SALT=local-salt
ADMIN_TOKEN=local-token
ENV

docker compose up -d --build
```

Open <https://binchitects.localhost:9443> and
<https://argus.localhost:9443>. Browsers resolve `*.localhost` to the loopback
address; accept the self-signed certificate warning. If your browser does not
resolve it, add both names to `/etc/hosts` as `127.0.0.1`.

The HTTP entrypoint redirects to `https://host/` on port 443, not to the
non-standard local HTTPS port. In a local trial, use the `https://…:9443` URL
directly.

## 5. What runs

| Container | User | Port | Writes | Health |
|---|---|---|---|---|
| `argus-site-edge-1` | root (key read only) | 80, 443 | nothing; `/tmp` | Traefik starts ready |
| `argus-site-binchitects-1` | `nginx` (uid 100) | 8080, internal | `/tmp` only | `GET /healthz` |
| `argus-site-web-1` | `nginx` (uid 100) | 8080, internal | `/tmp` only | `GET /healthz` |
| `argus-site-api-1` | `10001:10001` | 8080, internal | `/data` volume | `GET /healthz` |

The web and API containers run read-only roots with all Linux capabilities
dropped and `no-new-privileges`. Traefik runs read-only with only
`NET_BIND_SERVICE` and `DAC_OVERRIDE` (the latter so it can read a `0600` key),
and the Docker socket mounted read-only.

## 6. Data

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

## 7. Updates

```bash
git pull
docker compose up -d --build
```

Compose replaces changed images; the edge re-reads the Docker labels when the
new containers become healthy. Data is untouched. No migration is involved.

Roll back by checking out the previous commit and repeating the command; the
contact file is forward compatible by design.

## 8. Configuration reference

| Variable | Default | Notes |
|---|---|---|
| `ARGUS_DOMAIN` | `argus.binchitects.com` | Host routed to the Argus image |
| `BINCHIECTS_DOMAIN` | `binchitects.com` | Host routed to the studio image |
| `TLS_CERT_FILE` | `./deploy/tls/fullchain.pem` | Certificate covering both names |
| `TLS_KEY_FILE` | `./deploy/tls/privkey.pem` | Its private key |
| `HTTP_PORT` | `80` | Host port for Traefik's HTTP entrypoint |
| `HTTPS_PORT` | `443` | Host port for Traefik's HTTPS entrypoint |
| `DOCKER_SOCKET` | `/var/run/docker.sock` | Rootless: `/run/user/1000/docker.sock` |
| `IP_HASH_SALT` | empty | Set it; makes stored hashes non-linkable outside this deployment |
| `ADMIN_TOKEN` | empty | Enables the CSV export; empty disables it |
| `CONTACT_WEBHOOK_URL` | empty | JSON POST per enquiry, 5 s timeout, failures only logged |
| `GITHUB_TOKEN` | empty | Raises GitHub's 60 requests/hour anonymous limit |
| `CONTACT_PERMIT_LIMIT` | `5` | Per address, per window |
| `CONTACT_WINDOW_MINUTES` | `10` | Window length |
| `IMAGE_TAG` | `local` | Use a registry tag for a release |

Anything under ASP.NET's `Site:` section can be set with
`Site__PropertyName`. The full set is in `src/api/Configuration/SiteOptions.cs`.

## 9. Security notes

- **TLS** is terminated by Traefik with your certificate; HTTP is permanently
  redirected. The certificate and key are read-only mounts, never baked into an
  image.
- **CSP** is set by both nginx images (`src/web/nginx.conf` and
  `src/binchitects/nginx.conf`). Scripts come only from the same origin; styles
  allow inline because React sets style attributes. No frames, no objects,
  forms only to the same origin.
- **Forwarded headers** from Traefik are accepted by the API only from private
  networks, so a direct request cannot spoof an address for the rate limiter.
- **Rate limiting** is a fixed window per address on `POST /api/contact`.
  Rejections answer `429` with `Retry-After` and a JSON body.
- **Honeypot**: a hidden `website` field. A bot that fills it gets a normal
  `202` and nothing is stored.
- **Spam heuristic**: more than four links in a message is refused.
- **Contact data** is minimised: the address is hashed, the user agent is
  truncated, and nothing else is collected. See `/privacy`.
- **HSTS** is sent by nginx. Remove the header if the site is ever served over
  plain HTTP on a real hostname.
- **Containers**: read-only roots, `cap_drop: ALL`, `no-new-privileges`,
  non-root web users, and only `/data` and `/tmp` writable.
- **Docker socket**: Traefik needs it to watch labels; it is mounted read-only
  but still grants control of the daemon. Run the stack on a host you control.

## 10. Troubleshooting

**`ERR_TOO_MANY_REDIRECTS` behind Cloudflare** — the stack serves `CF-Ray`
requests over HTTP without redirecting, so first make sure the new edge is
running (`docker compose up -d`, then purge the Cloudflare cache). If it
persists, set SSL/TLS to **Full (strict)** or point the tunnel/Origin Rule at
443. See [Behind Cloudflare](#behind-cloudflare).

**`docker compose up` fails on the certificate** — one of the bind-mount paths
does not exist. Check `TLS_CERT_FILE` / `TLS_KEY_FILE`, and that the files contain
both names. Traefik's logs say `error reading certificate`.

**`404 page not found` from Traefik** — the Host does not match
`ARGUS_DOMAIN` / `BINCHIECTS_DOMAIN`, or the container is not healthy. Check
`docker compose ps` and `docker compose logs edge`.

**`502 Bad Gateway` on `/api/...`** — the API is not healthy:
`docker compose logs api`. The Argus image resolves it by the service name
`api`; keep both on the `internal` network.

**`502` on `binchitects.com`** — the studio image is not healthy. Check
`docker compose ps binchitects` and `docker compose logs binchitects`.

**The browser warns about the certificate** — the supplied certificate does not
cover the hostname, or it is a local self-signed certificate. Confirm the SANs
with `openssl x509 -in … -noout -ext subjectAltName`.

**The API exits with a permissions error on `/data`** — a bind mount was used
without matching ownership. The named volume initialises itself; for a bind
mount, `chown -R 10001:10001 ./data`.

**The changelog shows the built-in list** — GitHub was unreachable from the
container, or the anonymous rate limit was hit. Set `GITHUB_TOKEN`. The page
falls back on purpose and retries after a minute.

**Tests fail with 429** — the smoke script sends several contact requests from
one address. Wait for the window, or raise `CONTACT_PERMIT_LIMIT`.
