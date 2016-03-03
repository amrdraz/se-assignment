var express = require('express');
var path = require('path');
var app = express();
var db = require('./db.js')
var quotes = require('./quotes.js');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function (req,res,next) {
	res.render('./public/index.html');
});

 app.get('/index',function (req,res) {
 	res.render('./public/index.html');
 });

 app.get('/index.html',function (req,res) {
 	res.render('./public/index.html');
 });

  app.get('/api/quotes', function(req, res) {
   quotes.getQuotesFromDB(function(err, docs) {
     res.send(docs);
   });
 });

 app.get('/api/quote', function(req, res) {
   quotes.getQuoteFromDB(function(err, quote) {
     res.send(quote);
   });
 });
 


db.connect (function(err,db){
	if(err) 
		throw err;
	else{
		quotes.seed(function(err,seeded){
			if(seeded)
				console.log('seeded');
			else
				console.log('did not send');
		});
	}
});

module.exports=app;