var express = require("express");
var app = express();

function makeHtml(markdown) {
    var showdown = require("showdown");
    var converter = new showdown.Converter();

    return converter.makeHtml(markdown);
}
function toTimestamp(dateValue) {
    if (!isNaN(dateValue)) dateValue *= 1000;

    var months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];
    var date = new Date(dateValue);
    var timestamp = {unix: null, natural: null};

    if (!Number.isNaN(date.getTime())) {
        timestamp.unix = date.getTime() / 1000;
        timestamp.natural =
                months[date.getMonth()] + " " +
                date.getDate() + ", " +
                date.getFullYear();
    }

    return timestamp;
}

app.set("view engine", "pug");
app.get("/", function (req, res) {
    var fs = require("fs");

    fs.readFile("README.md", "utf8", function (err, data) {
        if (err) throw err;

        var markdownBody = makeHtml(data);
        res.render("index", {markdownBody: markdownBody});
    });
});
app.get("/favicon.ico", function (req, res) {
    res.sendStatus(404);
});
app.get("/:dateValue", function (req, res) {
    var timestamp = toTimestamp(req.params.dateValue);
    res.json(timestamp);
});
app.use("/css", express.static("css"));
app.listen(process.env.PORT);
