var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var quotes = require('./quotes.js');
var dataB = require("./db")

app.set('port', process.env.PORT || '3000');
app.listen('3000');

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

dataB.connect(function(dataB) {
	quotes.seed(function(err, seeded) {
	if(err) throw err
});
});

app.get('', function(req, res) {
	res.render("./public/index.html");
});

app.get('/api/quotes', function(req, res){
  res.json(quotes.getQuotesFromJSON());
});

app.get('/api/quote', function(req, res){
  res.json(quotes.getQuoteFromDB());
});
