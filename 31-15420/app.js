var  express =require('express');
var quotes=require('./quotes');
var router=express.Router();
var handelMain=function(req, res, next){
    res.sendfile('index.html', {root: 'public' });

};

router.get('/',handelMain);
module.exports=router;

router.get('/api/quote',function(req,res,next){
    quotes.getQuoteFromDB(function(err,quote){
        res.send(quote);
    })
});

router.get('/api/quotes',function(req,res,next){
    quotes.getQuotesFromDB(function(err,quote){
        res.send(quote);
    })
});
module.exports=router;
