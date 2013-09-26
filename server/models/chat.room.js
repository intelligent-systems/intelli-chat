var http = require('http'),
	server = require("socket.io");
	config = require('./config/config.js');

function ChatRoom(user, server) {
	var owner = null;
	var server = null;
	var users = [];
	var sockets = [];

	var history = [];

	var app = http.createServer(createChatRoom);
	
	app.listen(config.port);
	server.listen(app);

	server.sockets.on("connection", function(socket) {

	});
}

module.exports = ChatRoom;