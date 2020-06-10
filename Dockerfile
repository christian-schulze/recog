FROM nginx:1.18.0-alpine

RUN apk --update --no-cache add nodejs yarn sqlite-libs
RUN yarn global add pm2@latest

ADD ./server /tmp/server
WORKDIR /tmp/server
RUN yarn
RUN yarn build
RUN mkdir -p /usr/share/node/db
RUN cp -R /tmp/server/build/** /usr/share/node/

ADD ./web /tmp/web
WORKDIR /tmp/web
RUN yarn
RUN yarn build
RUN cp -R /tmp/web/build/** /usr/share/nginx/html/

ADD ./build/nginx.conf /etc/nginx/conf.d/default.conf
ADD ./build/docker-entrypoint.sh ./
RUN chmod u+x docker-entrypoint.sh

EXPOSE 4000
EXPOSE 80

CMD ["./docker-entrypoint.sh"]
