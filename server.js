var http = require('http');
var fs = require('fs');
var app = require('./app.js').app;
var db = require('./db.js');
var quotes = require('./quotes.js');
var PORT = 3000; 

db.connect(function(cb)
{
	quotes.seed(function (err,seeded){
		   app.listen(3000, function (err) {
			if(err) 
				throw err;
			else
               console.log('server listening on port 3000!');
			
      });
   });
});