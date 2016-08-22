'use strict';

const assert = require('assert');
const request = require('supertest');

const server = require('./../app.js').listen();

function timestamp(dateValue) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return function (res) {
    const date = isNaN(dateValue) ? new Date(dateValue) : new Date(dateValue * 1000);
    const unix = isNaN(dateValue) ? date.getTime() / 1000 : dateValue;
    const natural = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    assert.strictEqual(res.body.unix, unix);
    assert.strictEqual(res.body.natural, natural);
  };
}

describe('app', function () {
  it('should respond with json when given a path', function (done) {
    request(server)
      .get('/path')
      .expect('Content-Type', 'application/json; charset=utf-8', done);
  });

  it('should process unix timestamps', function (done) {
    let dateValue = 24364800;
    request(server)
      .get(`/${dateValue}`)
      .expect(timestamp(dateValue))
      .end(done);
  });

  it('should process natural language dates', function (done) {
    let dateValue = 'October 10, 1970';
    request(server)
      .get(`/${dateValue}`)
      .expect(timestamp(dateValue))
      .end(done);
  });

  it('should return null for non-dates', function (done) {
    request(server)
      .get('/asd qw 101')
      .expect({unix: null, natural: null}, done);
  });
});
