var express = require("express");
var quotes = require("./quotes.js");
var fs = require('fs');

exports.app = express();
exports.app.use(express.static('public'));
exports.app.get('/api/quote', function(req, res){
	 
	quotes.getQuoteFromDB(function(err, q){
		quote = q;
		res.send(q);
	});
	
});

exports.app.get('/api/quotes', function(req, res){
	quotes.getQuotesFromDB(function(err, q){
		res.send(q);
	});
});

exports.app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    fs.readFile('./public/404.html', function (err, file) {
                if (err) throw err;
                res.end(file);
            });
    return;
  }

  });

