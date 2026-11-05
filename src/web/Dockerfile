# syntax=docker/dockerfile:1.7
# The site's web image: the React build, served as static files by nginx
# without root. nginx proxies /api to the API container.
FROM node:22-alpine AS build
WORKDIR /web

COPY src/web/package.json src/web/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY src/web/ ./
RUN npm run build

FROM alpine:3.22 AS runtime

RUN apk add --no-cache nginx \
 && rm -rf /etc/nginx/http.d /var/www /var/lib/nginx /var/log/nginx

COPY --chmod=644 src/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /web/dist /srv/web
# Static files are read by the unprivileged nginx user whatever mode the build
# context had.
RUN chmod -R a+rX /srv/web

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=15s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO /dev/null http://127.0.0.1:8080/healthz || exit 1

# -e stderr: nginx opens its error log before reading the config, and the root is read-only.
CMD ["nginx", "-e", "stderr", "-g", "daemon off;"]
