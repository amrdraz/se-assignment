var express = require('express');
var router = express.Router();

router.get('/quote', function(req, res) {
    var quotes = req.quotes;
  	quotes.getQuoteFromDB( function(err,quote){
  		if(err)
  			throw Error("Error retrieving quote.")
  		else
  			res.json(quote);
  	});
});

router.get('/quotes', function(req, res) {
    var quotes = req.quotes;
  	quotes.getQuotesFromDB( function(err,quote){
  		if(err)
  			throw Error("Error retrieving quote.")
  		else
  			res.json(quote);
  	});
});

module.exports = router;
