'use strict';

const moment = require('moment');
const dateFormats = require('./date-formats.js');

class Timestamp {
  constructor(isValid) {
    Object.defineProperty(this, 'isValid', {value: isValid});
  }
}
class ValidTimestamp extends Timestamp {
  constructor(day) {
    super(true);
    this.unix = Number(day.format('X'));
    this.natural = day.format('ddd, DD MMM YYYY HH:mm:ss [GMT]');
  }
}
class InvalidTimestamp extends Timestamp {
  constructor() {
    super(false);
    this.error = 'Invalid Date';
  }
}

function timestampFactory(date) {
  const day = moment(date, dateFormats, true);
  if (day.isValid()) {
    return new ValidTimestamp(day);
  }
  return new InvalidTimestamp();
}

module.exports = timestampFactory;
