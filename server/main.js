var http = require("http");
var path = require("path");
var express = require("express");
var chatServer = require("./models/chat.server");

var app = express();

var config = require("./config/config")(app);
var routes = require("./routes/routes")(app);

app.use(express.static(__dirname + path.sep + 'static'));
app.listen(cfg.port);

var webServer = http.createServer(app);
var cs = new chatServer(webServer, cfg.server_name);