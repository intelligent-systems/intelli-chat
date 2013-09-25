var http = require("http");
var express = require("express");

var app = express();

var config = require("./config/config")(app);
var routes = require("./routes/routes")(app);

app.use(express.static(__dirname + '/static'));
app.listen(cfg.port);

var webServer = http.createServer(app);
var ChatServer = new require("./models/chat.server")(webServer, cfg.server_name);
