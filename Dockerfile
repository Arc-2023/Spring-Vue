
#VUE3
FROM caddy:2.6.1-alpine
#VOLUME  /tmp/caddy
#WORKDIR /tmp/caddy
ADD dist/ /www
ADD docker/Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
EXPOSE 80
#AriaNG

