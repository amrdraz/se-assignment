var db = require('../static/js/db.js');
var quote = require('../static/js/quotes.js');
var express = require('express');
var router = express.Router();

router.get('/api/quotes', function(req, res, next) {
	  quote.getQuotesFromDB(function fn1(err, quotes){
          res.send(quotes);
	});
    
});

router.get('/', function (req, res, next){
	res.send('index');
});

router.get('/index.html', function (req, res, next){
	res.send('index');
});
router.get('/api/quote', function (req, res, next){
	quote.getQuoteFromDB(function fn(err, quotes) {
		res.send(quotes);	
	});
})


module.exports = router;