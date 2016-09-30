# Timestamp Microservice

Timestamp Microservice converts Unix timestamps to date strings and vice-versa.

## Resources

### GET /:dateValue

Returns both the Unix timestamp and the natural language form of the dateValue

If the dateValue is neither a date nor a Unix timestamp, then it returns null properties

Example request URLs:

`https://timestamp-microservice.example.com/24364800`  
`https://timestamp-microservice.example.com/January 18, 2013`

#### Responses

**STATUS 200** - application/json

##### EXAMPLE

    {
      unix: 24364800,
      natural: October 10, 1970
    }
