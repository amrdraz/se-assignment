var fs=require('fs');
var database= require('./db');
var a =function a(b){
  console.log(b);
}
database.connect(a);
var db =database.db(); //might be redundent
var quotesCollection=db.collection('quotes');


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
seed(function (err, seeded) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
    if(err){ console.log("an error occured at seed!");seeded=false; throw err}
    if(quotesCollection===undefined || quotesCollection.count()==0){
      quotesCollection.insertMany(getQuotesFromJSON()); //if empty, populate!
      seeded=true;
    } else{
      seeded=false;
    }
});
getQuotesFromDB(function (err, quotes) {
    // any of quote object in the database
    if(err) throw err;
    quotes=quotesCollection.find().toArray();
    return quotes;
})
getQuoteFromDB(function (err, quote) {
    // any of quote object in the database
    if(err) throw err;
    var array=vquotesCollection.find().toArray();
     var i =Math.floor(Math.random() * array.length);
     quote =array[i];
     return quote;
})
console.log(quotesCollection.findOne());
//console.log(getQuoteFromJSON(0));
exports.getElementByIndexElseRandom;
exports.getQuotesFromJSON;
exports.getQuoteFromJSON;
exports.seed;
