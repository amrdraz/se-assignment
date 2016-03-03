var express = require('express');
var app = express();
var q = require('./quotes.js');
var path = require('path');

app.use(express.static('public'));

app.listen(3000, function () {
	console.log('listening on port: 3000');
});

app.get('/api/quote', function(req, res){
	q.getQuoteFromDB(function(err, quote){
		//if(err) throw Error ("Couldn't get quote.");
		//console.log(quote);
		res.send(quote);
	});
});
app.get('/api/quotes', function(req, res){
	q.getQuotesFromDB(function(err, quotes){
		//if(err) throw Error ("Couldn't get quotes.");
		res.send(quotes);
	});
});

app.get('/index.html', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('index', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;  