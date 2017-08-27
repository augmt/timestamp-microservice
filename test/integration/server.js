'use strict';

const test = require('tape');
const request = require('supertest');
const simple = require('simple-mock');
const app = require('../../app.js');

const server = app.listen();

test('server', t => {
  t.plan(3);

  simple.mock(Date, 'now').returnWith(1498953600000);

  request(server)
    .get('/')
    .expect('content-type', /json/)
    .expect(200, {unix: 1498953600, natural: 'Sun, 02 Jul 2017 00:00:00 GMT'})
    .end(err => {
      simple.restore();
      t.error(err, '200 GET /', err);
    });

  request(server)
    .get('/1451001600')
    .expect('content-type', /json/)
    .expect(200, {unix: 1451001600, natural: 'Fri, 25 Dec 2015 00:00:00 GMT'})
    .end(err => t.error(err, '200 GET /:date', err));

  request(server)
    .get('/asd qw 101')
    .expect('content-type', /json/)
    .expect(400, {error: 'Invalid Date'})
    .end(err => t.error(err, '400 GET /:date', err));
});

test.onFinish(() => server.close());
