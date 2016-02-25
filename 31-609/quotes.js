var database = require('./db');

var getElementByIndexElseRandom = function (array , index) {
  if(typeof index == "undefined")
  index = Math.floor(Math.random() * array.length);

  return array[index];
};

var getQuotesFromJSON = function () {
  var fs = require('fs');
  var quotes = fs.readFileSync('../quotes.json', 'utf8');

  return JSON.parse(quotes);
};

var getQuoteFromJSON = function (index) {
  return getElementByIndexElseRandom(getQuotesFromJSON(), index);
};

var seed = function (callback) { // ask about its functionality
  var db = database.db();
  var fs = require('fs');
  var quotes = fs.readFileSync('../quotes.json', 'utf8');
  var collection = db.collection('quotes');
  collection.insert(JSON.parse(quotes), function(err, docs) {
    db.close();
    if(err)
    callback(err, false);
    else
    callback(err, true);
  });
};

var getQuotesFromDB = function (callback) {
  var db = database.db();
  var collection = db.collection('quotes');
  collection.find().toArray(function(err, docs) {
    callback(err, docs);
  });
};

var getQuoteFromDB = function (callback, index) {
  getQuotesFromDB(function(err, quotes) {
    callback(err, getElementByIndexElseRandom(quotes, index));
  });
};

module.exports = {
  getElementByIndexElseRandom: getElementByIndexElseRandom,
  getQuotesFromJSON: getQuotesFromJSON,
  getQuoteFromJSON: getQuoteFromJSON,
  seed: seed,
  getQuotesFromDB: getQuotesFromDB,
  getQuoteFromDB: getQuoteFromDB
};
