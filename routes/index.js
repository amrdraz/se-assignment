var express = require('express');
var router = express.Router();
var path = require('path');

var http = require('http'),
    fs = require('fs');


router.get('/api/quote', function(req, res, next) {
	
 req.quotes.getQuoteFromDB(function(err,result)
	{
		if (!err)
		{
 		 res.json(result);
		}
		else

		{
			res.send("error while retrieving A QUOTE");
		}
	});


});

router.get('/api/quotes', function(req, res, next) {
	req.quotes.getQuotesFromDB(function(err,result)
	{
		if (!err)
		{
 		 res.json(result);
		}
		else

		{
			res.send("error while retrieving quotes");
		}
	});

});
module.exports = router;
