FROM nginx:1.25.3-alpine3.18-slim

RUN apk --update --no-cache add nodejs yarn sqlite-libs \
    && yarn global add pm2@latest

ADD ./server /tmp/server
WORKDIR /tmp/server
RUN yarn \
    && yarn build \
    && mkdir -p /usr/share/node/db \
    && cp -R /tmp/server/dist/** /usr/share/node/ \
    && rm -rf /tmp/server

ADD ./web /tmp/web
WORKDIR /tmp/web
RUN yarn \
    && yarn build \
    && cp -R /tmp/web/dist/** /usr/share/nginx/html/ \
    && rm -rf /tmp/web

ADD ./build/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./build/docker-entrypoint.sh ./
RUN chmod u+x docker-entrypoint.sh

EXPOSE 4000
EXPOSE 80

CMD ["./docker-entrypoint.sh"]
