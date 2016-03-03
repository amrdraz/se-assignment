var express = require('express');
var app = express();
var quoteJS = require ('./quotes');
var fs= require('fs');
var path = require('path');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + './public/index.html');
});

app.get('/api/quote',function(req,res){
	quoteJS.getQuoteFromDB(function (err, quote) {
		res.json(quote);
	});
});

app.get('/api/quotes',function(req,res){
	quoteJS.getQuotesFromDB(function (err, quotes) {
		res.json(quotes);
	});
});

//app.get();
// app.listen(3000, function () {
//   console.log('Example app listening on port 8080!');
// });

module.exports = app;
