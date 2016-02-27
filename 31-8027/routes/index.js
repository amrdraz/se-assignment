var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/quotes',function(req,res,next){
    req.db.getQuoteFromDB(function(err,quote){
      res.json(quote);
    });

});

module.exports = router;
