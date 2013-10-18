var http = require("http");
var path = require("path");
var express = require("express");

var app = module.exports.app = express();

var config = require("./config/config")(app);
var routes = require("./routes/routes")(app);

app.use(express.static(__dirname + path.sep + 'static'));

var webServer = http.createServer(app);

var chatServer = require("./models/chat.server");
var cs = new chatServer(webServer, cfg.server_name);

webServer.listen(cfg.port);