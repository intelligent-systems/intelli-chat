// Global configuration settings
cfg.port = 1337;

// App Specific settings
module.exports = function(app) {
	app.configure('development', function() {
		app.set('mongodb_connection_string', 'mongodb://localhost/intelli-chat');	
	});
}