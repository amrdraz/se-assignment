var http = require('http');
var fs = require('fs');
var app = require('./app.js');
var quotes = require('./quotes.js');
var db = require('./db.js');

var handleRequest = function handleRequest(request, response){
    if (request.url==='/index.html') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/index.html'));
    } else {
        response.writeHeader(404, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/404.html'));
    }
};

var server = http.createServer(handleRequest);

exports.server = server;

db.connect(function(err) {
    console.log('connected to db');
     quotes.seed(function (err, seeded){
    	console.log(seeded);
     });
     app.listen(8080, function() {
         console.log('Example app listening on port 8080!');
     });
});
