
var express = require('express');
var router = express.Router();
var quotes = require('./quotes');



router.get('/' , function(req , res , next){
	var quote = quotes.getQuoteFromDB(function(err , result){
		if(err)
			throw err;
		res.render('index');
	});
});


router.get('/api/quote' , function(req , res , next){

	var quote = quotes.getQuoteFromJSON();
	res.json(quote);
});



router.get('/api/quotes' , function(req , res , next){

	var allQuotes = quotes.getQuotesFromJSON();
	res.json(allQuotes); 
});

module.exports = router;