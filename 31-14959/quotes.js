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

function seed(function (err, seeded) {


});
