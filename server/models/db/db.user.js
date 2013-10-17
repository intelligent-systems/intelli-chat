var mongoose = require("mongoose")
	.connect("mongodb://localhost/intelli-chat");

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