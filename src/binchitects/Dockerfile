# syntax=docker/dockerfile:1.7
# The studio site: one static page, served by nginx without root.
FROM node:22-alpine AS build
WORKDIR /site

COPY src/binchitects/package.json src/binchitects/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY src/binchitects/ ./
RUN npm run build

FROM alpine:3.22 AS runtime

RUN apk add --no-cache nginx \
 && rm -rf /etc/nginx/http.d /var/www /var/lib/nginx /var/log/nginx

COPY --chmod=644 src/binchitects/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /site/dist /srv/site
RUN chmod -R a+rX /srv/site

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO /dev/null http://127.0.0.1:8080/healthz || exit 1

CMD ["nginx", "-e", "stderr", "-g", "daemon off;"]
