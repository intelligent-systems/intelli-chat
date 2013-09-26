var socket = io.connect('<%= cfg.server_address %>');
var sound = null;
var tab_focus = true;
var title = false;
var messageList = false;

socket.on('connect', function(){
	socket.on('event', function(data) {
		console.log(data);
	});

	socket.on('message', function(msg) {
		processMessage(msg);
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


/* ------------------------- MESSAGE ------------------------- */

function processMessage(msg, json) {
	if (!json)
		msg = $.parseJSON(msg);
	
	if (msg.type == 'msg') {
		messageList.add(msg);
		
		if (!json) // group messages are added before page load
			$("#chat").scrollTo($("#chat")[0].scrollHeight, 500);
		
		if (!tab_focus)
			sound.play();
			
	} else if(msg.length > 0 && msg[0] && msg[0].type == 'msg') {
		_.each(msg, function(m, index, collection){
			processMessage(m, true);
		});
	}
}

var MessageView = Backbone.View.extend({
	tagName: 'p',
	className: 'user message',
	template: false,
	initialize: function() {
		if (!this.template)
			this.template = _.template($('#message-template').html());
			
		this.listenTo(this.model, "change", this.render);
		this.attributes = {'style': 'background-color: ' + this.model.get('color_rgba')};
		$('#chat').append(this.render().$el);
	},
	render: function() {
		this.$el.css('backgroundColor', this.model.get('color_rgba'));
		this.$el.html(this.template(this.model.attributes));
		return this;
	}
});

var Message = Backbone.Model.extend({
	initialize: function() {
		this.view = new MessageView({ model: this });
	}
});

var MessageList = Backbone.Collection.extend({
	model: Message,
	comparator: 'timestamp',
	initialize: function() {
		
	}
});

messageList = new MessageList();


