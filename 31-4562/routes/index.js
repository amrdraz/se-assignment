var express = require('express');
var router = express.Router();
var quotes = require('../quotes.js');
var main = require('../public/js/main.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/api/quote');
});
router.get('/index', function(req, res, next) {
    res.redirect('/api/quote');
});
router.get('/index.html', function(req, res, next) {
   res.redirect('/api/quote');
});

router.get('/api/quote' , function(req,res){

quotes.getQuotesFromDB(function(err,quotes){
		if(err == null){
           
		}
	});
 
   

	quotes.getQuoteFromDB(function(err,quote){
		if(err == null){
		  res.render('index',{quote: quote.text});
		 
		}
	});
 
});

router.get('/api/quotes' , function(req,res){
	quotes.getQuotesFromDB(function(err,quotes){
		if(err == null){
           res.json(quotes);
		}
	});
 
});

module.exports = router;
