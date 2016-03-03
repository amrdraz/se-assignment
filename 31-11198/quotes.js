 var db = require('./db.js');
var quotes = require("../quotes.json");
exports.getElementByIndexElseRandom=function(array,index){

       if(arguments.length===1){
           var random=Math.floor(Math.random()*array.length);
           return array[random];
       }
       else 
        return array[index];
    
       };

 exports.getQuotesFromJSON=function(){

    var fs = require('fs');

    return JSON.parse(fs.readFileSync('/home/abdelrahman/project/quotes.json', 'utf8'));

};

exports.getQuoteFromJSON=function(index){

    var quotes=require('./quotes');
    var file=quotes.getQuotesFromJSON();
    if(arguments.length===1){
    var element=quotes.getElementByIndexElseRandom(file,index);
    return element;
    }

    else {
        var element=quotes.getElementByIndexElseRandom(file);
        return element;

    }
};

exports.seed= function(cb){
 var quotes=require('./quotes');
 var db=require('./db');
 var mongo=require('mongodb');
 var database=db.db();
 var qdb=db.db().collection('quotes').count(function(err,count){
        if(count===0){
            db.db().collection('quotes').insert(quotes.getQuotesFromJSON(),function(err,docs){
                console.log("seeded");
                cb(err,true);

            });
        }else{
            console.log("not seeded");
            cb(err,false);

        }

    });
    };
  exports.getQuotesFromDB=function(cb){
     var db=require('./db');
     var mongo=require('mongodb');
     var database=db.db();
     var qdb=db.db().collection('quotes').find();
     qdb.toArray(function(err,result){
         if(err)throw cb(err,result);
          cb(null,result);
    });


 };

 exports.getQuoteFromDB=function(cb,index){
     var db=require('./db');
     var mongo=require('mongodb');
     var quotes=require('./quotes');
     var database=db.db();
     if(arguments.length===1) {
         quotes.getQuotesFromDB(function (err, result) {
             if(err)throw err;
            else {
                var element = quotes.getElementByIndexElseRandom(result);
                 cb(null, element);
             }

         });
     }
         else{
             quotes.getQuotesFromDB(function(err,result){
                 if(err)throw err;
                 else {
                     var element = quotes.getElementByIndexElseRandom(result, index);
                     cb(err, element);
                 }

         });
     }

     };