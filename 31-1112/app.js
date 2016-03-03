var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var quote = require('./quotes');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
	response.send('index.html');
});

db.connect(function() {
	console.log('connected to db');
});

app.get('/api/quotes', function(request, response) {
	quote.getQuotesFromDB(function(err, data) {
		response.send(data);
	});	
});


app.get('/api/quote', function(request, response) {
	quote.getQuoteFromDB(function(err, data){
		response.send(data);
	});	
});


module.exports = app;