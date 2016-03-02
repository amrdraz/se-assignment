var qo= require("../quotes.json");
var db= require("../db.js");

    function getElementByIndexElseRandom([myArray,index]){
      var rand = myArray[Math.floor(Math.random() * myArray.length)];
      return rand;
 }

  function getQuotesFromJSON(){
    var parse= JSON.parse(qo);
   return parse;
  }

  function getQuoteFromJSON([index]){
     return getElementByIndexElseRandom(getQuotesFromJSON(),index);
     }

     function seed(cb){
      db.connect();
      var collection = db.db().collection("quotes");
      collection.count(function(error,count))
      if(count==0){
        collection.insertMany(quotes, function(){
            cb(error,true)
        })
      }
       else{
           if(error){
          console.log("error");
          cb(error,false);
          throw error;
      }
          
        }
        function getQuotesFromDB(cb){
          
            return getQuoteFromJSON([index]);
        }
        function getQuoteFromDB (cb,[index]) {
           return getQuotesFromDB();
        }
     }
 exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
 exports.getQuotesFromJSON=getQuotesFromJSON;
 exports.getQuoteFromJSON=getQuoteFromJSON;
 exports.seed=seed;
 exports.getQuotesFromDB=getQuotesFromDB;
 exports.getQuoteFromDB=getQuoteFromDB;





  
  
  