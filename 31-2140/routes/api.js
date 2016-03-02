var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/quote', function(req, res, next) {
	req.db.getQuoteFromDB(function(err,quote){
		res.json(quote);
	});
});


router.get('/quotes', function(req, res, next) {
	req.db.getQuotesFromDB(function(err,quote){
		res.json(quote);
	});
});

module.exports = router;
