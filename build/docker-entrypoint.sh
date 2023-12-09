#!/usr/bin/env sh

cd /usr/share/node
pm2 start index.mjs

nginx -g "daemon off;"
