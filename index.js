var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});

    res.end(JSON.stringify(url.parse(req.url, true), null, "    "));
}).listen(process.env.PORT);
