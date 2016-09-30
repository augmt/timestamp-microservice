'use strict';

import test from 'tape';
import { expect } from 'chai';
import request from 'supertest';
import app from './../src/app.js';

const server = app.listen();

test(app.name, (t) => {
  const tests = [
    (t, dateValue) => {
      request(server)
        .get('/' + dateValue)
        .expect('Content-Type', /json/)
        .end((err) => t.ifError(err, 'content-type should be json'));
    },
    (t, dateValue) => {
      request(server)
        .get('/' + dateValue)
        .expect((res) => expect(res.body).to.have.all.keys([
          'unix',
          'natural'
        ]))
        .end((err) => t.ifError(err, 'response properties should consist of all and only the specified properties'));
    }
  ];
  const testCases = [
    {
      dateValue: 24364800,
      message: 'for unix timestamps',
      tests: tests.concat([
        (t, dateValue) => {
          request(server)
            .get('/' + dateValue)
            .expect((res) => expect(res.body).to.deep.equal({
              unix: 24364800,
              natural: 'October 10, 1970'
            }))
            .end((err) => t.ifError(err, 'response values should be equivalent to the specified dateValue'));
        }
      ])
    },
    {
      dateValue: 'January 18, 2013',
      message: 'for natural language dates',
      tests: tests.concat([
        (t, dateValue) => {
          request(server)
            .get('/' + dateValue)
            .expect((res) => expect(res.body).to.deep.equal({
              unix: 1358467200,
              natural: 'January 18, 2013'
            }))
            .end((err) => t.ifError(err, 'response values should be equivalent to the specified dateValue'));
        }
      ])
    },
    {
      dateValue: 'asd qw 101',
      message: 'for invalid dates',
      tests: tests.concat([
        (t, dateValue) => {
          request(server)
            .get('/' + dateValue)
            .expect((res) => expect(res.body).to.deep.equal({
              unix: null,
              natural: null
            }))
            .end((err) => t.ifError(err, 'response values should be null'));
        }
      ])
    }
  ];

  testCases.forEach((testCase) => {
    t.test(testCase.message, (t) => {
      t.plan(testCase.tests.length);

      testCase.tests.forEach((test) => test(t, testCase.dateValue));
    });
  });
});

test.onFinish(() => server.close());
