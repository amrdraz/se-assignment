var jsonArray = require ("../quotes.json");
var db = require("./db.js");

function getElementByIndexElseRandom(array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
}
function getQuotesFromJSON(){
  return jsonArray;
}

function getQuoteFromJSON(index){
  return getElementByIndexElseRandom(getQuotesFromJSON(), index);
}

//Inserting the data into the database
function seed(cb) {
  //  db.clearDB(function(){
  //    done();
  //  });
	var collection_ = db.db().collection("quotes");
	collection_.count(function(err, c) {
		if(err){
      console.log("error occured");
			cb(err, false);
			throw err;
    }
		if(c === 0){
       for(var i=0;i<jsonArray.length;i++){
         collection_.insert(jsonArray[i]);
       }
       cb(err,true);
      console.log("Successful");
		}else{
			cb(err, false);
      console.log("The records are already in the db");
		}
	});
}

function getQuotesFromDB(cb) {
	db.db().collection("quotes").find({}).toArray(function(err, quotes) {
			cb(err, quotes);
	});
}

function getQuoteFromDB(cb, index) {
	getQuotesFromDB(function(err, quotes) {
		if(err)
			cb(err, quotes);
		else
			cb(err, getElementByIndexElseRandom(quotes, index));
	});
}
exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.seed = seed
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB
