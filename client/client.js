var http = require("http");
var http = require("http");
var path = require("path");
var express = require("express");

var app = express();

app.engine('html', require('ejs').renderFile);
app.engine('js', require('ejs').renderFile);

var config = require("./config/config")(app);
var routes = require("./routes/routes")(app);

app.use(express.static(__dirname + path.sep + "static"));

app.listen(805);

var server = http.createServer(app);