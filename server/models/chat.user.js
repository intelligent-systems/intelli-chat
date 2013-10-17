var DbUser = require("./db/db.user.js");

function ChatUser(socket) {
	var self = this;
	
	this.socket = socket;

	function isMe(socket) {
		return socket == self.socket;
	}
	this.isMe = isMe;

	function signIn(email, password) {	
		DbUser.findOne("email": email, "password": password).select("displayname").exec(function(err, doc) {
			console.log(doc.displayname);
		});	
	}
	this.signIn = signIn;
}

module.exports = ChatUser;