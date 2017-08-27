'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const timestampFactory = require('./timestamp-factory.js');

const app = new Koa();
const router = new Router();

function now() {
  const seconds = Date.now() / 1000;
  return seconds.toString();
}

router.get('/(.*)', ctx => {
  const timestamp = timestampFactory(ctx.captures[0] || now());
  ctx.body = timestamp;
  ctx.type = 'json';
  ctx.status = timestamp.isValid ? 200 : 400;
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
