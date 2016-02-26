var obj = require("../quotes.json")
var db = require("./db.js")

var getElementByIndexElseRandom = exports.getElementByIndexElseRandom =  function getElementByIndexElseRandom(array , indx){
   var sz = array.length;
   if(indx<0 || indx >=sz || indx == undefined)
      return array[parseInt(Math.random()*sz)];
    else
      return array[indx];
}
exports.getQuotesFromJSON =  function getQuotesFromJSON(){
  return obj;
}
exports.getQuoteFromJSON = function getQuoteFromJSON(indx) {
    if(indx  == undefined )
      return obj[parseInt(Math.random()*102)];
    else {
      return obj[indx];
    }
}
exports.seed = function seed(cb){
    var collection = db.db().collection('quotes');
    collection.count( function ( err , c) { //check thier count
      if(c == 0)
        collection.insert(obj, function(err, result) {cb(err,true)});
      else
          cb(err, false);
    });
}
exports.getQuotesFromDB = function getQuotesFromDB(cb){
  db.db().collection("quotes").find({}).toArray(function(err, quotes) {
      cb(err,quotes);
    });
}
exports.getQuoteFromDB = function getQuoteFromDB(cb ,indx){
  db.db().collection("quotes").find({}).toArray(function(err, quotes) {
      cb(err, getElementByIndexElseRandom(quotes,indx));
    });
}
