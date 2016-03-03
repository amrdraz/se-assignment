var express = require('express');
var fs       = require('fs');
var path = require('path');

var quotes = require('./quotes.js');
var app      = express();

app.use(express.static('./public'));



app.get('/index',function(req,res){
    fs.readFile('./public/index.html', function (err, file) {
                res.status(200).end(file);
            });
});




app.get('/api/quote', function(req, res) {
    quotes.getQuoteFromDB(function(err, row){
         
                var quote = {
                "author": row.author,
                "text": row.text,
                "id": row.id
                 }
         
                res.send(quote);
               

          });
});

app.get('/api/quotes', function(req, res) {
    quotes.getQuotesFromDB(function(err, quotes){
      res.send(quotes);
     });
});




app.use(function(req, res, next) {
  res.status(404).send("try again");
});



module.exports = app; 