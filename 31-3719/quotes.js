var ob = require("../quotes.json")
var db = require("./db.js")

// var _db = db.db()

function getElementByIndexElseRandom (arr, index) {
	 index = index === undefined ? Math.floor(Math.random() * arr.length) : index
	 return arr[index]
}

function getQuotesFromJSON() {
	return ob	
}

function getQuoteFromJSON(index) {
	return getElementByIndexElseRandom(getQuotesFromJSON(), index)
}


function seed(cb) {
	var collection = db.db().collection("quotes")
	collection.count(function(err, c) {
		if(err)
			cb(err, c)
		else if(c === 0){
			collection.insertMany(ob, function(err, res) {cb(err, true)})
		}else{
			cb(err, false)
		}
	})
}


function getQuotesFromDB(cb) {
	db.db().collection("quotes").find({}).toArray(function(err, quotes) {
		if(err)
			cb(err, quotes)
		else
			cb(err, quotes)
	})
}

function getQuoteFromDB(cb, index) {
	getQuotesFromDB(function(err, quotes) {
		if(err)
			cb(err, quotes)
		else
			cb(err, getElementByIndexElseRandom(quotes, index))
	})
}


exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.seed = seed
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB

