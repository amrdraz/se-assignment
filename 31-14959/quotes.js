var obj = require("../quotes.json")
var db = require("./db.js")

 function getElementByIndexElseRandom(array , indx){
  //  var s = 'Test the indx : '.concat(indx);
  //  console.log(s);
   var sz = array.length;
   if(indx<0 || indx >=sz) return -1;
   return array[indx];
}
 function getQuoteFromJSON(index) {
   return obj[indx];
}
function getElementByIndexElseRandom(array){
  var sz = array.length;
  return array[parseInt(Math.random()*sz)];
}
function getQuotesFromJSON(){
  // console.log(obj[0].author);
  return obj;

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
