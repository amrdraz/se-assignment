var fs = require('fs');
var assert = require('assert');
var DB = require ('./db.js');
var data=require('../quotes.json');
var quotes={
getElementByIndexElseRandom:function(array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
},

getQuotesFromJSON:function(){
  return data;

},

getQuoteFromJSON:function(index){
  var quotesArray=quotes.getQuotesFromJSON();
  return quotes.getElementByIndexElseRandom(quotesArray,index);
},

getQuotesFromDB: function(cb){
    DB.db().collection('quotes',function(err,collection){
    collection.find().toArray(function(err,items){
     var quotes=items;
     cb(err,quotes);
    });
    });
},

getQuoteFromDB:function(cb,index){
DB.db().collection('quotes').find(function(err,quotes1){
  assert.equal(null,err);
quotes1.toArray(function(err,quotesArray){
var quote= quotes.getElementByIndexElseRandom(quotesArray,index);
cb(err,quote);
});
});
},

seed: function seed(cb) {
  DB.db().collection('quotes').count(function(err,count){
  assert.equal(null,err);
  if(count!=0){
    cb(err,false);
  }else{
    var quotesArr =quotes.getQuotesFromJSON();

      DB.db().collection('quotes').insert(quotesArr, function(err, result) {
          assert.equal(null, err);
      });
    
    cb(err,true);
  }
  })
}
};


module.exports=quotes;
