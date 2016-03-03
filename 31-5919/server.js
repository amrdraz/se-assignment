var http = require('http');
var app = require('./app');
var PORT = 8080;

http.createServer(app).listen(PORT, function(){
	console.log("listening on " + PORT);
});