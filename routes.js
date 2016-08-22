'use strict';

const Router = require('koa-router');

const moment = require('moment');

moment.updateLocale('en', {invalidDate: NaN});

const router = module.exports = new Router();

router.get('/', (ctx) => {
  ctx.throw(404, 'ERROR: Must specify a unix timestamp or date string');
});

router.get('/:dateValue', (ctx) => {
  const day = isNaN(ctx.params.dateValue)
    ? moment(ctx.params.dateValue, ['LL', 'LLL', 'LLLL', 'll', 'lll', 'llll'])
    : moment.unix(parseFloat(ctx.params.dateValue));

  ctx.body = {
    unix: day.unix().valueOf(),
    natural: day.format('LL')
  };
  ctx.type = 'application/json';
});
