exports.getElementByIndexElseRandom=function(array,index){


       if(arguments.length===1){
           var random=Math.floor(Math.random()*array.length);
           return array[random];
       }
    if(arguments.length===2){
        return array[index];
    }
   }
 ;
 exports.getQuotesFromJSON=function(){

    var fs = require('fs');

    return JSON.parse(fs.readFileSync('/home/souidan/Desktop/Semester6/SE/31-2273/quotes.json', 'utf8'));

};

exports.getQuoteFromJSON=function(index){

    var quotes=require('./quotes');
    var file=quotes.getQuotesFromJSON();
    if(arguments.length===1){
    var x=  quotes.getElementByIndexElseRandom(file,index);
    return x;
    }

    else {
        var x=  quotes.getElementByIndexElseRandom(file);
        return x;

    }
};

exports.seed= function(cb){

    var dbFile=require('../db');
    var mongo=require('mongodb');
    var quotes=require('./quotes');
    var database=dbFile.db();
    var collection=dbFile.db().collection('quotesCollection').count(function(err,count){
        if(count===0){
            dbFile.db().collection('quotesCollection').insert(quotes.getQuotesFromJSON(),function(err,docs){
                console.log("I inserted!!");
                cb(err,true);

            });
        }else{
            console.log("I did not insert");
            cb(err,false);

        }


    });
    };
  exports.getQuotesFromDB=function(cb){
     var dbFile=require('../db');
     var mongo=require('mongodb');
     var database=dbFile.db();
     var collection=dbFile.db().collection('quotesCollection').find();
     collection.toArray(function(err,result){
         if(err)throw cb(err,result);
          cb(null,result);
     });


 };

 exports.getQuoteFromDB=function(cb,index){
     var dbFile=require('../db');
     var mongo=require('mongodb');
     var quotes=require('./quotes');
     var database=dbFile.db();
     if(arguments.length===1) {
         quotes.getQuotesFromDB(function (err, result) {
             if(err)throw err;
             else {
                 var x = quotes.getElementByIndexElseRandom(result);
                 cb(null, x);
             }

         });
     }
         else{
             quotes.getQuotesFromDB(function(err,result){
                 if(err)throw err;
                 else {
                     var x = quotes.getElementByIndexElseRandom(result, index);
                     cb(err, x);
                 }

         });
     }

     };









//console.log( getQuoteFromJSON(3));


/*exports.getElementByIndexElseRandom();
exports.getQuotesFromJSON();
exports.getQuoteFromJSON();*/

