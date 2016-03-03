var express = require('express');
var router = express.Router();
var quotes = require('./quotes.js');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/api/quote', function(req, res) {
  quotes.getQuoteFromDB(function(err, quote){
    res.json(quote);
  });
});

router.get('/api/quotes', function(req, res) {
  quotes.getQuotesFromDB(function(err, quotes){
    res.json(quotes);
  });
});

module.exports = router;
