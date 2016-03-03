var express = require('express');
var router = express.Router();
var quotes = require('../quotes.js');
var assert  = require('assert');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Inspire-me',quote: 'Click or tap on the page to get inspired' ,author: '' });

});

router.get('/api/quotes', function(req, res, next) {
  quotes.getQuotesFromDB(function(err, quotes) {
        if (err)
        return next(err);
        res.send(quotes);
    });
});

router.get('/api/quote', function(req, res, next) {
  quotes.getQuoteFromDB(function(err, quote) {
        if (err)
        return next(err);
        res.send(quote);
    });
});

module.exports = router;
