var http = require("http");
var http = require("http");
var path = require("path");
var express = require("express");
var ejs = require("ejs");

var app = express();

ejs.open = '{{';
ejs.close = '}}';

app.set("views", path.join(__dirname, "views"));
app.engine(".ejs", ejs.renderFile);

var config = require("./config/config")(app);
var routes = require("./routes/routes")(app);

app.use(express.static(__dirname + path.sep + "static"));

app.listen(805);

var server = http.createServer(app);