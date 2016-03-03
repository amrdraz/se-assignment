var express = require('express');
var router = express.Router();
var q = require('../quotes');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html')
});


router.get('/api/quote',function(req,res) {
  q.getQuoteFromDB(function(err,quote){
    res.send(quote);
  });
});

router.get('/api/quotes',function(req,res) {
  q.getQuotesFromDB(function(err,quote){
    res.send(quote);
  });
});

router.get('*',function(req,res){
  res.send('404 File not Found',404);
})



module.exports = router;
