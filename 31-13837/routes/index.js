var express = require('express');
var router = express.Router();

var DB = require('../db.js');
var Quotes = require('../quotes.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inspire Me', author: '', quote:'Click or Tap on the page to get inspired' });
});

/*
router.get('/index(.html)?', function(req, res, next) {
  res.render('index', { title: 'I want to get Inspires' , author:'' quote:'Click to get Inspired' });
});
*/

router.get('/api/quote', function(req, res, next) {
  Quotes.getQuoteFromDB(function(err, quote){
    if(!(err)){
      res.json(quote);
      console.log("Quote GET route OK !");
    } else {
      console.log("There's a problem in /api/quote");
    }
  });

});

router.get('/api/quotes', function(req, res, next) {
  Quotes.getQuotesFromDB(function(err, allQuotes){
    if(!(err)){
      console.log("Quote(S) GET route OK !");
      res.json(allQuotes);
    } else {
      console.log("There's a problem in /api/quotes");
    }
  });

});

module.exports = router;
