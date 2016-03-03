var express = require('express');
var router = express.Router();
var quotes = require('../quotes.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api/quote',function(req,res){
	quotes.getQuoteFromDB(function(err,quote){
		if(err)throw err;
		res.send(quote);
	}); 

	
});
router.get('/api/quotes',function(req,res){
	quotes.getQuotesFromDB(function(err,quote){
		if(err)throw err;
		res.send(quote);	
	}); 

	
});
module.exports = router;
