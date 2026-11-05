#!/usr/bin/env bash
# Checks the API of a running stack. No dependencies beyond curl and grep.
#   BASE_URL=http://127.0.0.1:8080 ./tests/smoke/api.sh
# Set ADMIN_TOKEN to also check the CSV export.
set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:8080}"
CURL_OPTS="${CURL_OPTS:-}"
SKIP_RATE_LIMIT="${SKIP_RATE_LIMIT:-0}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fail() { echo "FAIL: $*" >&2; exit 1; }
pass() { echo "ok   $*"; }

status() { curl $CURL_OPTS -sS -o "$tmp/body" -w '%{http_code}' "$@"; }

echo "API smoke test against $BASE_URL"

code="$(status "$BASE_URL/healthz")"
[ "$code" = "200" ] || fail "healthz answered $code"
pass "liveness is 200"

code="$(status "$BASE_URL/api/health")"
[ "$code" = "200" ] || fail "api/health answered $code"
grep -q '"status":"healthy"' "$tmp/body" || fail "health is not healthy: $(cat "$tmp/body")"
grep -q '"contact-store"' "$tmp/body" || fail "the contact store is not in the health report"
pass "readiness reports the contact store"

code="$(status -X POST "$BASE_URL/api/contact" \
  -H 'Content-Type: application/json' \
  -d '{"name":"A","email":"nope","topic":"nope","message":"short","consent":false}')"
[ "$code" = "400" ] || fail "an invalid contact request answered $code"
grep -q '"errors"' "$tmp/body" || fail "a 400 has no field errors"
pass "invalid input is refused with field errors"

code="$(status -X POST "$BASE_URL/api/contact" \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"Smoke Test\",\"email\":\"smoke-$(date +%s)@example.com\",\"company\":\"CI\",\"topic\":\"deployment\",\"message\":\"A smoke test message long enough to pass validation, sent by tests/smoke/api.sh.\",\"consent\":true}")"
[ "$code" = "201" ] || fail "a valid contact request answered $code: $(cat "$tmp/body")"
grep -q '"receivedAt"' "$tmp/body" || fail "a 201 has no body"
pass "a valid request is stored (201)"

code="$(status -X POST "$BASE_URL/api/contact" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Smoke Test","email":"bot@example.com","topic":"other","message":"A message a bot would send, behind the honeypot field.","consent":true,"website":"https://spam.example"}')"
[ "$code" = "202" ] || fail "the honeypot answered $code"
pass "the honeypot is answered and discarded (202)"

code="$(status "$BASE_URL/api/releases")"
[ "$code" = "200" ] || fail "releases answered $code"
grep -q '"releases"' "$tmp/body" || fail "releases has no list"
grep -q '"source"' "$tmp/body" || fail "releases has no source"
pass "releases answer with a source and a list"

if [ -n "${ADMIN_TOKEN:-}" ]; then
  code="$(status -H "X-Admin-Token: $ADMIN_TOKEN" "$BASE_URL/api/admin/leads?limit=5")"
  [ "$code" = "200" ] || fail "the lead export answered $code"
  head -1 "$tmp/body" | grep -q '^id,received_at,name' || fail "the export is not CSV"
  pass "the lead export answers with CSV"

  code="$(status -H "X-Admin-Token: wrong" "$BASE_URL/api/admin/leads")"
  [ "$code" = "401" ] || fail "a wrong admin token answered $code"
  pass "a wrong admin token is refused"
else
  code="$(status "$BASE_URL/api/admin/leads")"
  case "$code" in
    404|401) pass "the lead export is off without a token ($code)" ;;
    *) fail "the lead export answered $code with no token configured" ;;
  esac
fi

if [ "$SKIP_RATE_LIMIT" != "1" ]; then
  limited=0
  for _ in 1 2 3 4 5 6 7 8; do
    code="$(status -X POST "$BASE_URL/api/contact" \
      -H 'Content-Type: application/json' \
      -d '{"name":"Rate Test","email":"rate@example.com","topic":"other","message":"A rate-limit probe with enough characters in it.","consent":true}')"
    if [ "$code" = "429" ]; then limited=1; break; fi
  done
  [ "$limited" = "1" ] || fail "the rate limit never answered 429 in eight requests"
  grep -q '"retryAfterSeconds"' "$tmp/body" || fail "a 429 has no retryAfterSeconds"
  pass "the contact form is rate limited (429 with Retry-After)"
fi

echo "API smoke test passed."
