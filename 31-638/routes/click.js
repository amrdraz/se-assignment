var db = require ('./db.js');
var quote = require('./quotes.js');
var express = require('express');
var router = express.Router();

router.get('/apiquotes', function(req, res, next) {
	  quote.getQuotesFromDB(function function_name(quotes){
          res.send(quotes);
	});
 
});

router.get('/', function (req, res, next){
	res.send('index');
});

router.get('/index.html', function (req, res, next){
	res.send('index');
});



module.exports = router;