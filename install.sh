#!/bin/bash
npm install;

cp -r ./bybit-api/lib/util node_modules/bybit-api/lib;
cp -r ./bybit-api/lib/websocket-client.js node_modules/bybit-api/lib;