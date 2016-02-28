var express = require('express');
var router = express.Router();
var quoteF = require('../quotes.js')

router.get('/quote', function(req, res, next) {
  quoteF.getQuoteFromDB(function(err, retQuote){
    if (err)
    console.log("ERRRRRRRRRRR");
    else
    res.send(retQuote);
})
});

router.get('/quotes', function(req, res, next) {
  quoteF.getQuotesFromDB(function(err, retQuote){
    if (err)
    console.log("ERRRRRRRRRRR");
    else{
    res.send(retQuote);
  }
})
});

module.exports = router;
