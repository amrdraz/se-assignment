var fs=require('fs');
var database= require('./db');

var db=null;
var quotesCollection;// =db.collection('quotes');

function setDB(DB){
  db=DB;
}
exports.setQuotesCollection=function setQuotesCollection(coll){
  quotesCollection=coll;
}

exports.setDB=setDB;
var getElementByIndexElseRandom= function getElementByIndexElseRandom(array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
}
var getQuotesFromJSON =function getQuotesFromJSON(){
//  var result;
  // fs.readFile('../quotes.json', function (err, file) {
  //             var result=JSON.parse(file);
  //             // console.log(result)
  //               return result;
  //             });
  var quotes = require('../quotes.json');
  return quotes;
}
var getQuoteFromJSON = function getQuoteFromJSON(index){
  var res= getElementByIndexElseRandom(getQuotesFromJSON(),index);
  return res;
}
function seed(cb) {
  var seeded;
   quotesCollection.count(function (err, count) {
     if (count===0||quotesCollection===undefined) {
       quotesCollection.insertMany(getQuotesFromJSON());
       seeded=true;}
       else seeded =false;
       if(cb!==undefined)
       cb(err,seeded)
     });
   }
function getQuotesFromDB(cb) {
    // any of quote ob0ject in the database
    // if(err) throw err;
    quotesCollection.find().toArray(function(err, docs) {
    //  console.log('hena ' + docs);
        // if(cb === undefined) return docs;
        cb(err, docs);
    });
}
function getQuoteFromDB(cb,index) {
    // any of quote object in the database
    //if(err) throw err;
    getQuotesFromDB(function (err,docs){
      var array=docs;
      if(index===undefined){
      var i =Math.floor(Math.random() * array.length);
      quote =array[i];
      cb(err,quote);
      }
      else{
        quote =array[index];
        cb(err,quote);
      }
      // return quote;
    })

}
function clearQuotesFromDB(cb){
  quotesCollection.removeMany();
}
// console.log(quotesCollection.findOne());
// console.log(getQuoteFromJSON(0));
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;
exports.clearQuotesFromDB=clearQuotesFromDB;
