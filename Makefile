.PHONY: help dev-api dev-web dev-bin build test smoke up down logs clean

help:
	@echo "dev-api   run the .NET API on :5080"
	@echo "dev-web   run the Argus app on :5173 (proxies /api)"
	@echo "dev-bin   run the Binchitects site on :5174"
	@echo "build     build all three Docker images"
	@echo "test      type-check and test both sites, build the API"
	@echo "up        build and start the stack (Argus :8080, Binchitects :8100)"
	@echo "smoke     run the smoke tests against a running stack"
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
	docker compose up -d --build --wait
	@echo "Argus:       http://127.0.0.1:$${HTTP_PORT:-8080}"
	@echo "Binchitects: http://127.0.0.1:$${BINCHIECTS_HTTP_PORT:-8100}"

smoke:
	BASE_URL=http://127.0.0.1:$${HTTP_PORT:-8080} tests/smoke/web.sh
	BASE_URL=http://127.0.0.1:$${HTTP_PORT:-8080} ADMIN_TOKEN=$${ADMIN_TOKEN:-} tests/smoke/api.sh
	BASE_URL=http://127.0.0.1:$${BINCHIECTS_HTTP_PORT:-8100} tests/smoke/binchitects.sh

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf src/web/dist src/binchitects/dist src/api/bin src/api/obj
