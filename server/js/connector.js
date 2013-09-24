//var socket = io.connect("ws://intellisys.info:1337");
var socket = io.connect(window.location.origin);
var sound = null;
var tab_focus = true;

socket.on('connect', function(){
	socket.on('event', function(data) {
		console.log(data);
	});

	socket.on('message', function(msg) {
		$("#chat").append(msg);
		$("#chat").scrollTo($("#chat")[0].scrollHeight, 500);

		if (!tab_focus)
			sound.play();
	});

	socket.on('disconnect', function() {
		console.log("Disconnected.");
	});
});

$(document).ready(function() {
	$("#test").click(function() {
		socket.emit("message", $("#message").val());
		$("#message").val("");
		resizeField($("#message")[0]);
	});

	$("#message").keyup(function(e) {
		var code = e.keyCode ? e.keyCode : e.which;

		resizeField(this);

		if((code == 10 || code == 13) && (e.shiftKey || e.ctrlKey))
			return true;

		if(code == 10 || code == 13) {
			$("#test").trigger("click");
			return false;
		}
	});

	$(window).resize(onWindowResize);

	onWindowResize();

	window.onfocus = function() { tab_focus = true };
	window.onblur = function() { tab_focus = false };

	sound = new Audio('/sounds/windows_8.mp3');
});

function resizeField(field) {
	if (!$(field).val().length)
		$(field).css('height', '2em');
	else
		$(field).height(field.scrollHeight);
}

function onWindowResize() {
	$("#chat").height( $(window).innerHeight() - $("#sender").height() - 32 );
}