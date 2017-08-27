'use strict';

const test = require('tape');
const timestampFactory = require('../../timestamp-factory.js');

test('timestampFactory', t => {
  t.deepEqual(timestampFactory('1450137600'), {unix: 1450137600, natural: 'Tue, 15 Dec 2015 00:00:00 GMT'}, 'unix timestamp');
  t.deepEqual(timestampFactory('2015-12-25'), {unix: 1451001600, natural: 'Fri, 25 Dec 2015 00:00:00 GMT'}, 'iso-8601 timestamp');
  t.deepEqual(timestampFactory('20130208'), {unix: 20130208, natural: 'Fri, 21 Aug 1970 23:43:28 GMT'}, 'unix/iso-8601 duality');
  t.deepEqual(timestampFactory('asd qw 101'), {error: 'Invalid Date'}, 'invalid date');
  t.end();
});
