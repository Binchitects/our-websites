.PHONY: help dev-api dev-web build test smoke up down logs clean

help:
	@echo "dev-api   run the .NET API on :5080"
	@echo "dev-web   run the React app on :5173 (proxies /api)"
	@echo "build     build both Docker images"
	@echo "test      type-check and test the web app, build the API"
	@echo "up        build and start the stack on http://127.0.0.1:8080"
	@echo "smoke     run the smoke tests against a running stack"
	@echo "down      stop the stack"

dev-api:
	dotnet run --project src/api/Argus.Site.Api.csproj --urls http://127.0.0.1:5080

dev-web:
	cd src/web && npm run dev

build:
	docker compose build

test:
	cd src/web && npm test && npm run build
	dotnet build src/api/Argus.Site.Api.csproj -c Release

up:
	docker compose up -d --build --wait
	@echo "Site: http://127.0.0.1:$${HTTP_PORT:-8080}"

smoke:
	BASE_URL=http://127.0.0.1:$${HTTP_PORT:-8080} tests/smoke/web.sh
	BASE_URL=http://127.0.0.1:$${HTTP_PORT:-8080} ADMIN_TOKEN=$${ADMIN_TOKEN:-} tests/smoke/api.sh

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	rm -rf src/web/dist src/api/bin src/api/obj
