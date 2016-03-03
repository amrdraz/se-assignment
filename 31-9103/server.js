var http = require('http');
var fs = require('fs');
var express = require('express');
var app = require('./app.js');
var db = require("./db.js");
var qu = require("./quotes.js")




// var server = http.createServer(handleRequest);
// var handleRequest = function handleRequest(request, response){
//     if (request.url==='/index.html') {
//          response.writeHeader(200, {'Content-type':'text/html'});
//          response.end(fs.readFileSync('./app/index.html'));
       
//     } else {
//         response.writeHeader(404, {'Content-type':'text/html'});
//         response.end(fs.readFileSync('./app/404.html'));
//     }
// };
// var http = require('http');

// var handleRequest = function handleRequest(request, response){
//         response.writeHeader(200, {'Content-type':'text/plain'});
//         response.end('Server is working you visited: ' + request.url);
//     }
// }
// var server = http.createServer(handleRequest);

// var PORT = 8080; 
// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:%s", PORT);
// });

db.connect(function(err,db){
	qu.seed(function(){
		app.listen(3000)	
	});
})