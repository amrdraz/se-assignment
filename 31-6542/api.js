var express = require('express');
var quotes = require('./quotes.js');
var router = express.Router();
router.get('/quotes', function(req, res, next) 
{
  quotes.getQuotesFromDB(function (err,quotes)
  	{
  		res.json(quotes);
  	});
});

router.get('/quote', function(req, res, next) 
{
  quotes.getQuoteFromDB(function (err,Onequote)
  	{
  		res.json(Onequote);
  	});

});
module.exports = router;
