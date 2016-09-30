'use strict';

import Router from 'koa-router';
import moment from 'moment';

const router = new Router();
const dateFormats = ['LL', 'LLL', 'LLLL', 'll', 'lll', 'llll'];

moment.updateLocale('en', {invalidDate: NaN});

router.get('/:dateValue', (ctx) => {
  const day = isNaN(ctx.params.dateValue)
    ? moment(ctx.params.dateValue, dateFormats, true)
    : moment.unix(parseFloat(ctx.params.dateValue));

  ctx.body = {
    unix: day.unix().valueOf(),
    natural: day.format('LL')
  };
  ctx.type = 'json';
});

export default router;
