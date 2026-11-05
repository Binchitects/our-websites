# TLS files

Put the certificate and key here (or point `TLS_CERT_FILE` and `TLS_KEY_FILE`
somewhere else in `.env`). Both names must be in the certificate:

- the Argus host (`ARGUS_DOMAIN`, e.g. `argus.binchitects.com`)
- the studio apex (`BINCHIECTS_DOMAIN`, e.g. `binchitects.com`)

A single certificate with both names as SANs is enough; Traefik serves it for
both domains. The files are read-only mounts; restarting the stack picks up a
renewed certificate.

For a local test certificate (browser warning expected):

```bash
openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
  -keyout deploy/tls/privkey.pem -out deploy/tls/fullchain.pem \
  -subj "/CN=binchitects.localhost" \
  -addext "subjectAltName=DNS:argus.localhost,DNS:binchitects.localhost"
```
