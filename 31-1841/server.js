
 var app = require('./app');
 var debug = require('debug')('31-0728:server');
 var http = require('http');
 
 var express = require('express');
 var port ='3000'
 app.set('port', port);
 var ex = express();
 
 var server = http.createServer(app);
 ex.use('/', app);
 
 server.listen(port);
 //server.on('error', onError);
 //server.on('listening', onListening);

 
 
 
 
 


 /**
  * Event listener for HTTP server "listening" event.
  */
 