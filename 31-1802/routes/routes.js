var db = require('../db.js');
var express = require('express');
var router = express.Router();
var quotes = require('../public/quotes')

router.get('/', function(req, res) {
    res.sendFile('index.html');
    });


router.get('/quote', function(req, res) {
	quotes.getQuoteFromDB(function(err, quote){
		res.json(quote);
		});
	});

router.get('/quotes', function(req, res) {
	quotes.getQuotesFromDB(function(err, quotes){
		res.json(quotes);
		});
	});

module.exports = router;
