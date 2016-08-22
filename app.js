'use strict';

const Koa = require('koa');

const cors = require('kcors');
const favicon = require('koa-favicon');
const json = require('koa-json');
const router = require('./routes.js');

const app = module.exports = new Koa();

app.use(cors());
app.use(favicon());
app.use(json());
app.use(router.routes());
