var express = require('express');
var router = express.Router();
var quotes = require('./quotes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('index.html',{root: 'public'});
});

router.get('/api/quote', function(req, res, next) {
  quotes.getQuoteFromDB(function(err,quote){
    res.send(quote);
  });
});

router.get('/api/quotes', function(req, res, next) {
  quotes.getQuotesFromDB(function(err,quotes){
    res.send(quotes);});
});


module.exports = router;