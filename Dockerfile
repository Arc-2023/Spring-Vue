
#VUE3
FROM caddy
VOLUME  /tmp/caddy
WORKDIR /tmp/caddy
COPY dist /www
COPY docker/Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
EXPOSE 80

#AriaNG

