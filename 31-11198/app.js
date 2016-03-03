var http = require('http') ;
var express = require('express');
var app = express();
var fs = require('fs');
var db = require('./db.js');
var quote =require('./quotes.js');
app.use(express.static('./public'));

app.get('/api/quote', function(req, res, next) {
    quotes.getQuoteFromDB(function (err ,quote ){
   	res.json(quote);
   
	}
);
});

app.get("/api/quotes", function (req, res,next) {
	quotes.getQuotesFromDB(function (err ,quotes ){
   	res.json(quotes);
});
});
module.exports = app;