var path = require("path");

module.exports = function (app) {
	app.get("/", function (req, res) {
		res.render("index.ejs", {
			cfg: cfg
		});
	});

	app.get("/js/client.js", function(req, res) {
		res.header("Content-type", "text/javascript; chatset=utf-8");
		res.render("client.ejs", {
			cfg: cfg
		});
	});
}