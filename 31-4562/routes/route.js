var express = require('express');
var router = express.Router();
var quotes = require('../quotes.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title : 'Hatem Morgan'});
});
router.get('/index', function(req, res, next) {
    res.render('index',{title : 'Hatem Morgan'});
});
router.get('/index.html', function(req, res, next) {
  res.render('index',{title : 'Hatem Morgan'});
});

router.get('/api/quote' , function(req,res){

   

	quotes.getQuoteFromDB(function(err,quote){
		if(err == null){
		  res.json(quote);
		 
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
