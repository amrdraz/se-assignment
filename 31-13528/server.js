var app   = require('./app.js');
var http  = require('http');

var server = app.listen(8000, function() {
 		console.log("Listening on port 8000...");
 });