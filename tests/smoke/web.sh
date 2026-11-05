#!/usr/bin/env bash
# Checks the static site and the /api proxy of a running stack.
#   BASE_URL=http://127.0.0.1:8080 ./tests/smoke/web.sh
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:8080}"
CURL_OPTS="${CURL_OPTS:-}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "ok   $*"; }

fetch() { curl $CURL_OPTS -sS -D "$tmp/headers" -o "$tmp/body" "$@"; }
code() { curl $CURL_OPTS -sS -o /dev/null -w '%{http_code}' "$@"; }

echo "Web smoke test against $BASE_URL"

# Every prerendered route answers 200 with its own title.
check_route() {
  local route="$1" expected="$2"
  local status
  status="$(code "$BASE_URL$route")"
  [ "$status" = "200" ] || fail "$route answered $status"
  fetch "$BASE_URL$route"
  grep -qi "<title>.*$expected.*</title>" "$tmp/body" || fail "$route has the wrong title"
  pass "$route serves its prerendered shell"
}

check_route "/" "ARGUS"
check_route "/platform" "Platform"
check_route "/code-arena" "Code Arena"
check_route "/argus" "Argus"
check_route "/security" "Security"
check_route "/changelog" "Changelog"
check_route "/contact" "Talk to us"
check_route "/privacy" "Privacy"
check_route "/brand" "Brand"
check_route "/fa" "ARGUS"
check_route "/fa/platform" "پلتفرم"
check_route "/fa/brand" "برند"

fetch "$BASE_URL/fa"
grep -qi '<html[^>]*lang="fa"[^>]*dir="rtl"' "$tmp/body" || fail "the Persian shell is not RTL"
grep -qi 'hreflang="fa"' "$tmp/body" || fail "the Persian hreflang is missing"
pass "the Persian shell declares its language, direction and alternate"

fetch "$BASE_URL/"
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
[ "$(code "$BASE_URL/healthz")" = "200" ] || fail "the web health check is down"
pass "sitemap, robots and the web health check answer"

fetch "$BASE_URL/api/health"
grep -q '"status"' "$tmp/body" || fail "/api is not proxied to the API"
pass "/api is proxied to the API"

status="$(code "$BASE_URL/a-route-that-does-not-exist")"
[ "$status" = "404" ] || fail "an unknown route answered $status"
fetch "$BASE_URL/a-route-that-does-not-exist"
grep -qi "Page not found" "$tmp/body" || fail "the English 404 page is missing"
pass "unknown routes answer with a real English 404"

status="$(code "$BASE_URL/fa/a-route-that-does-not-exist")"
[ "$status" = "404" ] || fail "an unknown Persian route answered $status"
fetch "$BASE_URL/fa/a-route-that-does-not-exist"
grep -qi "صفحه پیدا نشد" "$tmp/body" || fail "the Persian 404 page is missing"
pass "unknown Persian routes answer with a real Persian 404"

echo "Web smoke test passed."
