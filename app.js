var express = require('express');
var quotes = require('./quotes.js');
exports.app = express();
exports.app.use(express.static('public'));

exports.app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

exports.app.get('/api/quote',function (req,res)
{
	quotes.getQuoteFromDB(function (err,quote)
	{
		res.send(quote);
	});
});

exports.app.get('/api/quotes' ,function (req, res)
{
	quotes.getQuotesFromDB(function (err,quotes)
	{
		res.send(quotes);
	});
});

exports.app.get('*', function(req, res){
	res.status(404);
  res.sendFile(__dirname + '/public/404Page.html', 404);
});



