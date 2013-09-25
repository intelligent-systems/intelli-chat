var fs = require("fs");
var path = require("path");

// Global and general configuration settings
global.cfg = {};

cfg.environment = "development";
cfg.port = 1337;

cfg.server_name = "Intelligent Systems Chat Server";

// Environment config settings
module.exports = function(app) {
	var name = "";

	switch(cfg.environment) {
		case "development":
		case "staging":
		case "production":
			name = cfg.environment;
			break;
		default:
			name = "production";
			break;
	}

	if(fs.existsSync(__dirname + path.sep + "config." + name + ".js")) {
		require("./config." + name)(app);
	}
}