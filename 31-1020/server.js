
var router  = require('./app');
var express = require('express');

var path = require('path');
var server = express();
var quote = require('./quotes');

quote.seed(function(err,seeded){
if(err){
	console.log('error!!!');
}
});

server.use(express.static(path.join(__dirname, 'public')));
server.use('/',router);
server.use(function(req,res,next){
res.status(404);

res.send('404 NOT FOUND');
});


server.listen('3000', function(){
console.log('[OK] HTTP Server listening on http://localhost:3000');
}); 

