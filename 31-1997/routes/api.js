var express = require('express');
var router = express.Router();
var quotes = require("../quotes");

/* GET random quote if /num isn't passed */
router.get('/quote(/:num)?', function(req, res, next) {
    quotes.getQuoteFromDB(function(err, quote) {
        if (err) throw Error("Couldn't get quote");
        res.json(quote);
    },req.params.num);
});


/* GET all quotes. */
router.get('/quotes', function(req, res, next) {
    quotes.getQuotesFromDB(function(err, quotes) {
        if (err) throw Error("Couldn't get quotes");
        res.json(quotes);
    });
});

module.exports = router;
