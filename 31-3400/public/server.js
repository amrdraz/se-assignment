// var http = require('http');

// var handleRequest = function handleRequest(request, response){
//         response.writeHeader(200, {'Content-type':'text/html'});
//         response.end(request.url);
// }
// var server = http.createServer(handleRequest);
// var PORT = 8080; 
// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:%s", PORT);
// });

// var express = require('express');
// var connect = require('connect');
// var http = require('http');

// var path = "~/Desktop/public/index.html";

// var app = connect().use(express.static(__dirname + path));
// http.createServer(app).listen(8080);

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(8080, function () {
//   console.log('Example app listening on port 3000!');
// });
// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });