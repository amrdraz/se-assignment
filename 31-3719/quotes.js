var ob = require("../quotes.json")
var db = require("./db.js")

var _db = db.db()

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
	var collection = _db.collection("quotes")
	collection.count(function(err, c) {
		if(err)
			cb(err, null)
		else if(c === 0){
			ob.foreach(function(q) {
				collection.insertOne(q, function(err, res) {
					if(err)
						cb(err, null)
						throw err
				})
			})
			cb(null, true)
		}else{
			cb(null, false)
		}
	})
}


function getQuotesFromDB(cb) {
	_db.collection("quotes").find({}).toArray(function(err, quotes) {
		if(err)
			cb(err, null)
		else
			cb(null, quotes)
	})
}

function getQuoteFromDB(cb, index) {
	getQuotesFromDB(function(err, quotes) {
		if(err)
			cb(err, null)
		else
			cb(null, getElementByIndexElseRandom(quotes, index))
	})
}


exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.seed = seed
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB

