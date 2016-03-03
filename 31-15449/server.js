var app = require('./app');
var http = require('http');

var server = http.createServer(app);

server.listen(4000);

console.log('Server is up and working on port:4000');
