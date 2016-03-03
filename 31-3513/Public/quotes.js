
var DB = require("./db.js");

        function getElementByIndexElseRandom(array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
    
    }
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;

  function getQuotesFromJSON(){
 var json = require('../quotes.json');
 return json;
  }
exports.getQuotesFromJSON =getQuotesFromJSON;


  function getQuoteFromJSON(index){
  	var array = getQuotesFromJSON();
  	return getElementByIndexElseRandom(array,index);
  }

  exports.getQuoteFromJSON= getQuoteFromJSON;
  
function seed (cb){
  DB.db().collection("quotes").count(function (err,length){
    if (err)
      return cb(err);
    if (length!==0){
      cb(null, false)
    }
    else{
      DB.db().collection('quotes').insertMany(getQuotesFromJSON(), function(err,response){
        cb(null, true);
      });
    }
  });
}

exports.seed = seed;
function getQuotesFromDB (cb) {
DB.db().collection('quotes').find().toArray(function (err, quotes){
  if (err)
    return cb(err);
  else
    return cb(null, quotes);

});
}
exports.getQuotesFromDB=getQuotesFromDB;
function getQuoteFromDB (cb , index){
  getQuotesFromDB(function(err, quotes){
    if (err) 
      return cb (err);
    else
      return cb(err, getElementByIndexElseRandom(quotes, index));
  });
}

exports.getQuoteFromDB=getQuoteFromDB;