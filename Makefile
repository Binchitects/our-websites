.PHONY: help dev-api dev-web dev-bin build test smoke up down logs clean

help:
	@echo "dev-api   run the .NET API on :5080"
	@echo "dev-web   run the Argus app on :5173 (proxies /api)"
	@echo "dev-bin   run the Binchitects site on :5174"
	@echo "build     build all three Docker images"
	@echo "test      type-check and test both sites, build the API"
	@echo "up        build and start the stack; HTTPS on HTTPS_PORT"
	@echo "smoke     run the smoke tests (CURL_OPTS=-k for self-signed)"
	@echo "down      stop the stack"

dev-api:
	dotnet run --project src/api/Argus.Site.Api.csproj --urls http://127.0.0.1:5080

dev-web:
	cd src/web && npm run dev

dev-bin:
	cd src/binchitects && npm run dev

build:
	docker compose build

test:
	cd src/web && npm test && npm run build
	cd src/binchitects && npm test && npm run build
	dotnet build src/api/Argus.Site.Api.csproj -c Release

up:
	docker compose up -d --build --wait --wait-timeout 180
	@set -a; . ./.env; set +a; \
	echo "Argus:       https://$${ARGUS_DOMAIN}:$${HTTPS_PORT}"; \
	echo "Binchitects: https://$${BINCHIECTS_DOMAIN}:$${HTTPS_PORT}"

smoke:
	@set -a; . ./.env; set +a; \
	BASE_URL="https://$${ARGUS_DOMAIN}:$${HTTPS_PORT}" CURL_OPTS="$${CURL_OPTS:-}" tests/smoke/web.sh; \
	BASE_URL="https://$${ARGUS_DOMAIN}:$${HTTPS_PORT}" ADMIN_TOKEN="$${ADMIN_TOKEN:-}" \
		CURL_OPTS="$${CURL_OPTS:-}" tests/smoke/api.sh; \
	BASE_URL="https://$${BINCHIECTS_DOMAIN}:$${HTTPS_PORT}" CURL_OPTS="$${CURL_OPTS:-}" tests/smoke/binchitects.sh

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf src/web/dist src/binchitects/dist src/api/bin src/api/obj
