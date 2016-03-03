var http = require('http');
var app = require ('./app');
var q = require("./quotes.js");
var d = require("./db.js");
var server = http.createServer(app);
var PORT = 8080; 

d.connect(function(db){
	q.seed(function(err, seeded){
		server.listen(PORT,function(err){
			if(!err)
				console.log("Server listening on:"+ PORT);
			else 
				console.log("Problem in server");
		});
	});
});