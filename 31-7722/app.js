var express = require('express');
var quotes = require('./quotes.js');
var path= require('path');
var app = express();
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res) {
	res.writeHeader(200,{'content-type' : 'text/html'});
  res.sendFile('./public/index.html');
});

app.get('/api/quotes', function (req, res) {
	// res.writeHeader(200,{'content-type' : 'text/html'});
	var q = quotes.getQuotesFromDB(function(err,quo){
		res.send(quo);
	});
});

app.get('/api/quote', function (req, res) {
	console.log('made request');
	// res.writeHeader(200,{'content-type' : 'text/html'});
var q = quotes.getQuoteFromDB(function(err,quote){
		res.send(quote);
	});

	
});


app.get('*', function (req, res) {

	res.writeHead(404,{'content-Type':'text/html'});
	res.write("404 Page not found");

});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
module.exports=app;