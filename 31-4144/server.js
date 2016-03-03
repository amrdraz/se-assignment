var express = require('express');
var app = express();
var quotes = require('./quotes');
app.use(express.static('./public'));
var db = require('./db');

db.connect(function(err, db) {
       if (err) throw err;
       else
       	 {
         quotes.seed(function(err,db){
         if(err) throw err;

         app.listen(3000, function () {
         console.log('app listening on port 3000!');
         });
         });
       	 
       	 }
});

app.get('/api/quote', function (req, res) {
  
  var quote =  quotes.getQuoteFromDB(function(err, quote){

  res.send(quote);});
  
});

app.get('/api/quotes', function (req, res) {

  quotes.getQuotesFromDB(function(err, quotes){

  res.send(quotes);
   });
});

