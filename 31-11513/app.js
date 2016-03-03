var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');
var quo = require('./quotes.js');

app.use(express.static(path.join(__dirname, 'public')));
quo.seed(function(err,seeded){

});

app.get('/index', function(req, res) {
	var fs = require('fs');
	res.end(fs.readFileSync('./public/index.html'));
});

app.get('/api/quote', function(req, res) {
quo.getQuoteFromDB(function(err,quote){
	res.send(quote);
});

//writes its code

});

app.get('/api/quotes', function(req, res) {
quo.getQuotesFromDB(function(err,quote){
    res.send(quote);

});

//write its code

});

app.use(function(req, res, next) {
  res.status(404).send('error 404, Page can not be found!');
});


db.connect(function() {
	console.log('database connected!');
});

module.exports = app;