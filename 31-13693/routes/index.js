var express = require('express');
var router = express.Router();
var quoteFile = require('../quotes.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' ,quote:'Click to get Inspired' , author:'' });
});
router.get('/index(.html)?', function(req, res, next) {
  res.render('index', { title: 'Express' ,quote:'Click to get Inspired' , author:''  });
});

router.get('/api/quote',function(req,res,next){
   quoteFile.getQuoteFromDB(function(err,quote){
     if(!err){
       console.log("It's fine in index.js in api/quote route");

       res.json(quote);
     }
     else console.log("It's 5ra in index.js in api/quote route");
   });
});

router.get('/api/quotes',function(req,res,next){
   quoteFile.getQuotesFromDB(function(err,quotes){
    if(!err){
      console.log("It's fine in index.js in api/quotes route");
      res.json(quotes);
    }
    else console.log("It's 5ra in index.js in api/quotes route");
  });
});

module.exports = router;
