var http = require('http'),
	server = require("socket.io");

function ChatRoom(user, server) {
	var self = this;

	this.owner = null;
	this.server = null;
	this.users = [];

	this.history = [];

	this.server = http.createServer(this.app);
	this.server.listen(cfg.port);

	this.server.sockets.on("connection", function(socket) {

	});

	function disconnectUser(user) {
		if(null == user || undefined == user)
			return;

		delete self.users[self.users.indexOf(user)];

		if(0 >= self.users.length)
			this.server.close;
	}
	this.disconnectUser = disconnectUser;
}

module.exports = ChatRoom;