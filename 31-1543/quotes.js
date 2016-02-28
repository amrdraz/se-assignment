var quotes = require("../quotes.json");
var dataB = require("./db.js");
var q = require("./quotes.js")

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array,index){
  if(index === undefined){
    var x = parseInt(Math.random()* (array.length));
    return array[x];
  }
  else{
    return array[index];
  }
}

exports.getQuotesFromJSON = function getQuotesFromJSON(){
  return quotes;
}

exports.getQuoteFromJSON = function getQuoteFromJSON(index){
  return q.getElementByIndexElseRandom(q.getQuotesFromJSON(), index);
  }

exports.seed = function seed(cb) {
	var collection = dataB.db().collection("quotes")
	collection.count(function(err, count) {
		if(err)
			cb(err, count)
		else if(count === 0){
			collection.insert(quotes, function(err, res) {cb(err, true)})
		}else{
			cb(err, false)
		}
	})
}

exports.getQuotesFromDB = function getQuotesFromDB() {
  return dataB.db().collection("quotes").find().toArray();
 }


exports.getQuoteFromDB = function getQuoteFromDB(index) {
	return q.getElementByIndexElseRandom(q.getQuotesFromJSON(),index);
}
