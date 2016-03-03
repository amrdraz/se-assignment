var http = require('http');
var app = require('./app.js');
var fs = require('fs');

var port = 3000;
http.createServer(app).listen(3000, function () {
	 console.log('listening on port: %s', port);
	 console.log('To connect, try typing "localhost:%s" into your browser', port);
});
/*var handleRequest = function handleRequest(request, response){

            if (request.url==='/index.html' || request.url==='/' || request.url==='index') {
            response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./public/index.html', function (err, file) {
                if (err) throw err;
                response.end(file);
                
        });
            
        } else if (request.url.indexOf('css') != -1) {
                response.writeHeader(200, {'Content-type':'text/css'});
                fs.readFile('./public/css/style.css', function (err, file) {
                    if (err) throw err;
                    response.end(file);
            });
            } else {
            response.writeHeader(404);
            response.end('Are you lost friend?');
        }
};
var server = http.createServer(handleRequest);
var PORT = 8080; 
server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
    });*/