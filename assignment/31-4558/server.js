// server.js

//var http = require('http');
var app = require('./app');
var q = require('./quotes');
var db = require('./db.js');
//var server = http.createServer(app);

//var PORT = 3000; 
//server.listen(PORT, function(){
  //  console.log("Server listening on: http://localhost:%s", PORT);
//});

//exports = app;

db.connect(function(err, db){
	if (err) throw err;
	q.seed(function(err, db){
		if (err) throw err;
	});
	app.listen(3000, function () {
   console.log('Inspire application listening on port 3000!');
});
});

