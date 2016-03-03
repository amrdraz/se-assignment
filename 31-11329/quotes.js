var con = require('./db');
function getElementByIndexElseRandom(array,index){
  if(getElementByIndexElseRandom.arguments.length==2){
    return array[index];
  }else {
    index=Math.round(Math.random() * (array.length-1));
    return array[index];
  }
}

function getQuotesFromJSON(){
  var file = require('../quotes.json');
  return file;
}

function getQuoteFromJSON(index){
  if (getQuoteFromJSON.arguments.length==1) {
    //console.log(file()[index]);
    return getQuotesFromJSON()[index];
  }else{
      index=Math.round(Math.random() * (getQuotesFromJSON().length-1));
      //  console.log( getQuotesFromJSON()[index]);
      return getQuotesFromJSON()[index];
  }
}

exports.seed=function(cb) {
  con.db().collection('quotes').find({}).toArray(function (err,docs) {
    if (docs.length==0) {
      //var doc=getQuotesFromJSON();
    con.db().collection('quotes').insert(require('../quotes.json'));
    cb(err,true);
  }else {
    cb(err,false);
  }
});
}

function getQuotesFromDB(cb) {
  var data =con.db().collection('quotes').find( ).toArray(function (err,quotes) {
  if (quotes.length==0) {
    cb(err,quotes);
  }  else {
    cb(null,quotes);
  }
  });

  }
//console.log(getElementByIndexElseRandom([1,2]));

function getQuoteFromDB(cb,index){
  if(index==undefined){
    getQuotesFromDB(
      function (err,docs) {
        if(!err){
          cb(null,getElementByIndexElseRandom(docs));
        }else{
          cb(err,getElementByIndexElseRandom(docs));
        }

      }
    );
  }else{
    getQuotesFromDB(function (err,docs) {
      if(!err){
        cb(null,getElementByIndexElseRandom(docs,index));
      }else{
        cb(err,getElementByIndexElseRandom(docs,index));
      }
    });
  }
}
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;
