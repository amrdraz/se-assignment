var express = require('express');
var app = express();
var quotes = require('./quotes.js');

app.use(express.static('./public'));

app.get('/api/quotes', function(req, res, next) {
    quotes.getQuotesFromDB(function(err, quotes){
        if(err)
            return next(err);
        res.send(quotes);
    });
});

app.get('/api/quote', function(req, res, next) {
    quotes.getQuoteFromDB(function(err, quote){
        if(err)
            return next(err);
        res.send(quote);
    });
});

module.exports = app;