#!/usr/bin/env sh

cd /usr/share/node
pm2 start index.js

nginx -g "daemon off;"
