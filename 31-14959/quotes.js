var obj = require("../quotes.json")
var db = require("./db.js")

 function getElementByIndexElseRandom(array , indx){
   var sz = array.length;
   if(indx<0 || indx >=sz || indx == undefined)
      return array[parseInt(Math.random()*sz)];
    else
      return arr[indx];
}
function getQuotesFromJSON(){
  // console.log(obj[0].author);
  return obj;
}
function getQuoteFromJSON(index) {
  return obj[indx];
}

exports.seed = function seed(cb){
    var collection = db.db().collection("quotes");
    collection.count( function ( err , c) { //check thier count
      if(c ==0)
        collection.insertMany(obj , function(err, result) {cb(err,true)});
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
      cb(err , getElementByIndexElseRandom(quotes,indx));
    });
}
