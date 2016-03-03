var db = require('../db.js');
var express = require('express');
var router = express.Router();
var quotes=require('../quotes.js');

router.get('/api/quote', function(req, res, next) {
	quotes.getQuoteFromDB(function(err,json){
          if(!err){
          	res.send(json);

          }
          	
	});
	
	
	
});
router.get('/',function(req,res){
   res.render('index');
});



router.get('/index.html',function(req,res){
   res.render('index');
});

router.get('/api/quotes', function(req, res, next) {
	quotes.getQuotesFromDB(function(err,json){
          if(!err){
          	res.send(json);
          }
	
});

});

module.exports = router;