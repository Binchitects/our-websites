#!/usr/bin/env bash
# Checks the studio site and its static assets on a running stack.
#   BASE_URL=http://127.0.0.1:8100 ./tests/smoke/binchitects.sh
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:8100}"
CURL_OPTS="${CURL_OPTS:-}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "ok   $*"; }

fetch() { curl $CURL_OPTS -sS -D "$tmp/headers" -o "$tmp/body" "$@"; }
code() { curl $CURL_OPTS -sS -o /dev/null -w '%{http_code}' "$@"; }

echo "Binchitects smoke test against $BASE_URL"

status="$(code "$BASE_URL/")"
[ "$status" = "200" ] || fail "/ answered $status"
fetch "$BASE_URL/"
grep -qi "<title>.*Binchitects.*</title>" "$tmp/body" || fail "the title is missing"
grep -qi 'property="og:image"' "$tmp/body" || fail "the social image meta is missing"
grep -q 'Open by default' "$tmp/body" || fail "the page was not prerendered"
grep -q 'href="https://argus.binchitects.com"' "$tmp/body" || fail "the link to Argus is missing"
pass "/ serves the prerendered studio page"

status="$(code "$BASE_URL/fa")"
[ "$status" = "200" ] || fail "/fa answered $status"
fetch "$BASE_URL/fa"
grep -qi "<title>.*Binchitects.*</title>" "$tmp/body" || fail "the Persian title is missing"
grep -qi '<html[^>]*lang="fa"[^>]*dir="rtl"' "$tmp/body" || fail "the Persian page is not RTL"
grep -q 'در باز است' "$tmp/body" || fail "the Persian page was not prerendered"
grep -q 'href="https://argus.binchitects.com"' "$tmp/body" || fail "the Argus link is missing from the Persian page"
grep -qi 'hreflang="fa"' "$tmp/body" || fail "the Persian hreflang is missing"
pass "/fa serves the prerendered Persian page"

for header in content-security-policy x-content-type-options referrer-policy permissions-policy; do
  grep -qi "^$header:" "$tmp/headers" || fail "the site does not send $header"
done
grep -qi "script-src 'self'" "$tmp/headers" || fail "the CSP does not restrict scripts to self"
pass "security headers are present"

asset="$(grep -o '/assets/[^"]*\.js' "$tmp/body" | head -1 || true)"
[ -n "$asset" ] || fail "no built script was found in the page"
fetch "$BASE_URL$asset"
grep -qi 'cache-control:.*max-age=31536000' "$tmp/headers" || fail "hashed assets are not cached for a year"
pass "the built script is served and cached"

[ "$(code "$BASE_URL/sitemap.xml")" = "200" ] || fail "sitemap.xml is missing"
[ "$(code "$BASE_URL/robots.txt")" = "200" ] || fail "robots.txt is missing"
[ "$(code "$BASE_URL/og.png")" = "200" ] || fail "og.png is missing"
[ "$(code "$BASE_URL/healthz")" = "200" ] || fail "the health check is down"
pass "sitemap, robots, the social card and the health check answer"

status="$(code "$BASE_URL/a-route-that-does-not-exist")"
[ "$status" = "200" ] || fail "the SPA fallback answered $status"
pass "unknown routes fall back to the page"

echo "Binchitects smoke test passed."
