var fs = require('fs');
var quotesArray=[];

var database = require ('./db');
var collection=null;



function getElementByIndexElseRandom(array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
};
function getQuotesFromJSON(){
  quotesArray= require('../quotes.json');
  return quotesArray;
}

//////////////////////////////////////////////
function getQuoteFromJSON(index){
  return getElementByIndexElseRandom(quotesArray,index);
};
/////////////////////////////////////////////
function seed(cb){
   getQuotesFromJSON();
     database.db().collection('quotes',function(err,collection){
       collection.find().toArray(function(err,items){
         if(items.length==0){
           collection.insert(quotesArray,function(err,result){
             if(err) cb(err,false);
             else cb(err,true);
             });
         }
         else {
           cb(err,false);
         }
       });
     });

};
//////////////////////////////////////////
function getQuotesFromDB(cb){
  database.db().collection('quotes',function(err,collection){
    collection.find().toArray(function(err,items){
      var quotes=items;
      cb(err,quotes);
    });
  });

};
//////////////////////////////////////////////
function getQuoteFromDB(cb,index){
   database.db().collection('quotes',function(err,collection){
     collection.find().toArray(function(err,items){
       var i = (index===undefined)?Math.floor(Math.random() * items.length):index;
      var  quote=items[i];
         cb(err,quote);
     });
   });

};
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuoteFromDB=getQuoteFromDB;
exports.getQuotesFromDB=getQuotesFromDB;
