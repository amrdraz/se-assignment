var express=require('express');
var router=express.Router();

router.get('/quote', function(request, response,next) {
  
  request.db.getQuoteFromDB(function(err, q) {
    response.json(q);
    next();
  });
});

router.get('/quotes', function(request, response,next) {
  request.db.getQuotesFromDB(function(err, q) {
    response.json(q);
    next();
  });
});
module.exports=router;