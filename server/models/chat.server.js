var sio = require("socket.io");
var room = require("./chat.room");
var user = require("./chat.user");

function ChatServer(server, name) {
	var server = server;
	var name = name;

	var rooms = [];
	var users = [];

	var instance = sio.listen(server);
	

	instance.sockets.on("connection", function(socket) {
		u = new ChatUser(socket);
		users.push(u);
	});
}

ChatServer.prototype.createRoom = function(user) {
	r = new room.ChatRoom(user, this);
}

/**
 * @exports ChatServer
 */
module.exports = ChatServer;