/**
 * Main Experimental File
 * @author Lyubomir Gardev <l.gardev@intellisys.org>
 * @license GPLv2
 */
var sys = require("sys");
var os = require("os");
var http = require("http");
var server = require("socket.io");
var fs = require("fs");
var path = require("path");
var mime = require('mime');
var randomcolor = require("just.randomcolor");

var users = [];
var text = "";

var color = new randomcolor({ r: [0, 200], g: [0, 200], b: [0, 200], a: [0.05, 0.05] });

var app = http.createServer(function(request, response) {
	var filepath = __dirname + "\\" + (request.url == '/' ? "index.html" : request.url);

	fs.exists(filepath, function(exists) {
		if(exists) {
			fs.readFile(filepath, function(err, contents) {
				if(err) {
					response.writeHead(500);
					response.end();
				}

				var type = mime.lookup(filepath);

				response.writeHead("Content-type: " + type + "; charset=utf-8");
				response.write(contents);
				response.end();
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
});

app.listen(1337);
server = server.listen(app);

server.sockets.on("connection", function(socket) {
	onUserConnected(socket);

	socket.on("message", function(msg) {
		msg = nl2br(msg);
		var line = '<p class="user message" style="background-color: ' + socket.color_rgba + '">[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '] <span style="color: ' + socket.color + '">' + socket.handshake.address.address +  '</span>: ' + msg + '</p>' + "\n";
		text += line;

		users.forEach(function(user) {
			user.emit("message", line);
		});
	});

	socket.on("disconnect", function() {
		onUserDisconnected(socket);
	});
});

function onUserConnected(socket) {
	socket.color = color.refresh().toHex().toCSS();
	socket.color_rgba = color.toRGBA().toCSS();
	users.push(socket);
	socket.emit("message", text);

	line = '<p class="system message">[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '] User <span style="color: ' + socket.color + '">' + socket.handshake.address.address + '</span> has connected.</p>' + "\n";
	text += line;

	users.forEach(function(user) {
		user.emit("message", line);
	});
}

function onUserDisconnected(socket) {
	delete users[users.indexOf(socket)];

	line = '<p class="system message">[' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '] User <span style="color: ' + socket.color + '">' + socket.handshake.address.address + '</span> has disconnected.</p>' + "\n";
	text += line;

	users.forEach(function(user) {
		user.emit("message", line);
	});
}

function nl2br (str, is_xhtml) {
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}