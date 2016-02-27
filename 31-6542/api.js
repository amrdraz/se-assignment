var express = require('express');
var quotes = require('./quotes.js');
var router = express.Router();
router.get('/quotes', function(req, res, next) 
{
  res.send(quotes.getQuotesFromJSON());	
});
router.get('/quote', function(req, res, next) 
{
  res.send(quotes.getQuoteFromJSON());	
});
module.exports = router;