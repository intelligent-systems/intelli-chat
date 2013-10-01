function ChatUser(socket) {
	var self = this;
	
	this.socket = socket;

	function isMe(socket) {
		return socket == self.socket;
	}
	this.isMe = isMe;
}

module.exports = ChatUser;