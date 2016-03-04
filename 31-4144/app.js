var express = require('express');
var app = express();
var quotes = require('./quotes');
app.use(express.static('./public'));
var db = require('./db');



app.get('/api/quote', function (req, res) {
  
  var quote =  quotes.getQuoteFromDB(function(err, quote){

  res.send(quote);});
  
});

app.get('/api/quotes', function (req, res) {

  quotes.getQuotesFromDB(function(err, quotes){

  res.send(quotes);
   });
});


exports = app;
