var http = require("http");
var http = require("http");
var path = require("path");
var sio = require("socket.io");
var express = require("express");

var app = express();

app.use(express.static(__dirname + path.sep + "static"));
app.listen(805);

var server = http.createServer(app);