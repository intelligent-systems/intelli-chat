var app = require("./../../main.js").app;

var mongoose = require("mongoose").connect(app.get('mongodb_connection_string'));

var schema = new mongoose.Schema({
	id: 'number',
	email: 'string',
	displayname: 'string',
	firstname: 'string',
	lastname: 'string',
	active: 'boolean'
});

var DbUser = mongoose.model("users", schema);

module.exports = DbUser;