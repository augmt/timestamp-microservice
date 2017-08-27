# Timestamp Microservice

Convert date strings to Unix timestamps and a natural language (RFC-1123)
format.

## How it Works

This microservice uses [Moment][1] to validate input and format output and
[koa-router][2] to capture path parameters and, along with [Koa][3], serve
requests.

[1]: https://momentjs.com/
[2]: https://github.com/alexmingoia/koa-router
[3]: http://koajs.com/

### Valid Formats

| Format         | Example    |
|----------------|------------|
| Unix Timestamp | 1450137600 |
| [ISO-8601][4]  | 2015-12-25 |

_Note_: Unix timestamps have precedence over the ISO-8601 format, so a string
such as "20130208" will be parsed as a unix timestamp.

[4]: http://www.cl.cam.ac.uk/~mgk25/iso-time.html

## How to Use

`app.js` exports a Koa app. Koa apps have an [`app.listen()`][5] method that is
identical to Node's [http.Server.listen()][6].

Import `app.js` and call `app.listen()` to start up the microservice.

[5]: http://koajs.com/#app-listen-
[6]: https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback

## API Resources

### GET /

Returns a `Timestamp` object based on the current time.

#### REQUEST

__Sample__: `https://timestamp-microservice.example.com/`

#### RESPONSE

__Status__: 200 - `application-json`

__Response__:

    {
      "unix": 1498953600,
      "natural": "Sun, 02 Jul 2017 00:00:00 GMT"
    }

### GET /:date

Returns a `Timestamp` object based on `date`.

#### REQUEST

__Sample__: `https://timestamp-microservice.example.com/1450137600`

#### RESPONSE

__Status__: 200 - `application-json`

__Response__:

    {  
      "unix": 1450137600,
      "natural": "Tue, 15 Dec 2015 00:00:00 GMT"
    }
