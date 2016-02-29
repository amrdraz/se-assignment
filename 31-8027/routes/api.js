var express=require('express');
var router=express.Router();
//var quote=require('../quotes');


router.get('/', function(request, response) {

  response.render('index');
});


router.get('/index', function(request, response) {
  response.render('index');
});


router.get('/index.html', function(request, response) {
  response.render('index');
});
/*
router.get('/api/quote', function(request, response,next) {
  
  quote.getQuoteFromDB(function(err, q) {
    response.json(q);
    next();
  });
});

router.get('/api/quotes', function(request, response,next) {
  quote.getQuotesFromDB(function(err, q) {
    response.json(q);
    next();
  });
});
*/

module.exports=router;