var express = require('express');
var app = express();
var db = require('./db.js');
var quotes = require('./quotes.js');
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/js'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public/css'));
var fs = require('fs');
app.get('/api/quotes', function(req, res, next) {
    db.connect(function(error,db){
    	if(error){console.log(error);}
    quotes.getQuotesFromDB(function(err, quotes){
    	if(err){
    		console.log("There is an error");
    	}else{
    		res.send(quotes);
    	}
    });
	});
});
var path    = require("path");


app.get('/',function(req,res){
  res.sendFile(index.html);
  //__dirname : It will resolve to your project folder.
});
app.get('/index.html',function(req,res ,next){
	 res.sendFile(index.html);});
app.get('index',function(req,res, next){
	 res.sendFile(index.html);
	});

app.get('/api/quote', function(req, res, next) {
	db.connect(function(error,db){
		if(error){console.log(error)}

		 quotes.getQuoteFromDB(function(err, quote){
		
    	if(err){
    		console.log("There is an error");
    	}else{
    		res.send(quote);
    	}
    });
	});
   
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


module.exports = app;

