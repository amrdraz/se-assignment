var express = require('express');
var router = express.Router();
var quotes = require('./quotes');


router.get('/' , function(req, res) {
  res.render('index');
});

router.get('/api/quote' , function(req, res){
  quotes.getQuoteFromDB(function(err,quote){
    res.json(quote);
  });
});


router.get('/api/quotes' , function(req, res){
  quotes.getQuotesFromDB(function(err,quotes){
    res.json(quotes);
  });
});

// handling errors

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = router;
