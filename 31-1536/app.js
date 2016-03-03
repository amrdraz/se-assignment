var express = require('express');
var app = express();
var quotes = require("./quotes.js");

app.use(express.static('./public'));

app.get('/api/quote', function(req, res, next) {
    quotes.getQuoteFromDB(function(err,quote){
        if (err) throw err;
        res.json(quote);
    });
});
app.get('/api/quotes', function(req, res, next) {
    quotes.getQuotesFromDB(function(err,quotes){
        if (err) throw err;
        res.json(quotes);
    });
});

module.exports = app;