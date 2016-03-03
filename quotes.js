var db     = require("./db");
var quotes = require ("./quotes.json")

function getElementByIndexElseRandom(array,index) {
  var size = array.length;

  if(index === undefined) {

    index = Math.floor(Math.random()*size);

  }

  return array[index];
}

function getQuotesFromJSON() {

  return quotes;

}

function getQuoteFromJSON(index) {

  return getElementByIndexElseRandom(quotes,index);
}

function getQuotesFromDB(cb) {

  db.db().collection("quotes").find({}).toArray(function(err, quotes){

    cb(err,quotes);

  });
}

function getQuoteFromDB(cb,index) {

  db.db().collection("quotes").find({}).toArray(function(err, quotes) {

      cb(err,getQuoteFromJSON(index));
})

}

function seed(cb) {

  var c = db.db().collection("quotes");
  var flag = false;

  	c.count(function(err, number) {

      if(err) {

        flag = false;

      }

  		else {

        if(number === 0) {

        c.insertMany(quotes, function(err, res) {

        })

        flag = true;

  		}

    }

      cb(err,flag);

  	});
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom
exports.getQuotesFromJSON = getQuotesFromJSON
exports.getQuoteFromJSON = getQuoteFromJSON
exports.getQuotesFromDB = getQuotesFromDB
exports.getQuoteFromDB = getQuoteFromDB
exports.seed = seed
