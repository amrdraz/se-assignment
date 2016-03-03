var express = require('express');
var router = express.Router();
var quote = require('../quotes.js');

// router.get('/' , function(req,res){
// 	res.render('index');
// });


router.get('/api/quote',function(req,res){
	 quote. getQuoteFromDB(function(error,quote){
	 	if (error)
	 		res.send("error");
	 	else	
	 		res.json(quote);
	 		 	


	 },null);
});

router.get('/api/quotes',function(req,res){
	quote.getQuotesFromDB(function(error,quote){
		if (error)
			res.send("errorr");
		else
			res.json(quote);
	});
});

	router.get('/',function(req , res){
			res.render('index.hjs');

	});
router.get('/index.html',function(req , res){
			res.render('index.hjs');

	});

router.get('/index',function(req , res){
			res.render('index.hjs');

	});


module.exports = router;
