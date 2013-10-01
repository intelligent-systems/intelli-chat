var sio = require("socket.io");
var room = require("./chat.room");
var user = require("./chat.user");

function ChatServer(server, name) {
	var self = this;

	this.server = server;
	this.name = name;

	this.rooms = [];
	this.users = [];

	this.instance = sio.listen(server);
	

	this.instance.sockets.on("connection", function(socket) {
		var u = new user(socket);
		self.users.push(u);

		socket.on("message", function(msg) {
			
		});

		socket.on("disconnect", function() {
			self.disconnectUser(u);
		});
	});

	function createRoom(user) {
		r = new room(user, sel);
	}
	this.createRoom = createRoom;

	function disconnectUser(user) {
		if(null == user || undefined == user)
			return;

		self.rooms.forEach(function(room) {
			room.disconnectUser(user);
		});

		delete self.users[self.users.indexOf(user)];
	}
	this.disconnectUser = disconnectUser;

}
/**
 * @exports ChatServer
 */
module.exports = ChatServer;