
#VUE3
FROM caddy
#VOLUME  /tmp/caddy
#WORKDIR /tmp/caddy

COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY dist/ /www
EXPOSE 8080
EXPOSE 80
#AriaNG

