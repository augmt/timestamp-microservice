# [API Basejump][1]: Timestamp Microservice

[1]: https://www.freecodecamp.com/challenges/timestamp-microservice

Visit this site with [any integer or valid dateString][2] in the [URL path][3]
to see JSON data about that point in time.

[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Parameters
[3]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax

## Examples

* `https://yats-ms.herokuapp.com/2147483647`
* `https://yats-ms.herokuapp.com/-4904928000`
* `https://yats-ms.herokuapp.com/Dec 31, 2999`

## Example output:

* `{"unix":2147483647,"natural":"January 19, 2038"}`
* `{"unix":-4904928000,"natural":"July 28, 1814"}`
* `{"unix":32503593600,"natural":"December 31, 2999"}`
