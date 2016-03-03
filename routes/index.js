var express = require('express');
var router = express.Router();
var quotes = require('../quotes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('index.html');
});

router.get('/index.html', function(req, res, next){
  res.sendfile('index.html');

});

router.get('index', function(req, res, next){
  res.sendfile('index.html');

});



router.get('/api/quote', function(req, res, next){
  quotes.getQuoteFromDB(function(err,quote){

    res.json(quote);
  });



//  res.json(quotes.getQuoteFromJSON());

})

router.get('/api/quotes', function(req, res, next){
  quotes.getQuotesFromDB(function(err,quote){

    res.send(quote);
  });



  //res.send(quotes.getQuotesFromJSON());

})



router.get('*', function(req, res, next){
  res.send('404 File not Found', 404);
})

module.exports = router;
