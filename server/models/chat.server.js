var sio = require("socket.io");
var user = require("./models/chat.user");

function ChatServer(server, name) {
	var server = server;
	var name = name;

	var rooms = [];
	var users = [];

	var instance = sio.listen(server);

	instance.sockets.on("connection", function(socket) {
		users.push(new user.ChatUser(socket));
	});
}

module.exports = ChatServer;