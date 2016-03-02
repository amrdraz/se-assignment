// Dependancies
var jsonQuotes = require('../quotes.json');
var db = require('./db');

// Sends quote in JSON
exports.find = function(req, res) {

  getQuoteFromDB(function(err, quote) {
    res.send(quote);
  });

};

// Sends all quotes in JSON
exports.findAll = function(req, res) {

  getQuotesFromDB(function(err, quotes) {
    res.send(quotes);
  });

};

// Gets indexed/random element from array
exports.getElementByIndexElseRandom = function(array, index) {

  if (index === undefined)
    return array[Math.floor(Math.random() * array.length)];
  else
    return array[index];

};

// Gets all quotes from quotes.json
exports.getQuotesFromJSON = function() {
  return jsonQuotes;
};

// Gets indexed/random quote from quotes.json
exports.getQuoteFromJSON = function(index) {

  if (index === undefined)
    return this.getQuotesFromJSON()[Math.floor(Math.random() * jsonQuotes.length)];
  else
    return this.getQuotesFromJSON()[index];

};

// Populates database
function seed(cb) {

  db.db().collection('quotes', {
    strict: true
  }, function(err, collection) {

    if (err) {

      db.db().collection('quotes', function(err, collection) {
        collection.insert(jsonQuotes, {
          safe: true
        }, function(err, result) {});
      });

      cb(err, true);

    } else
      cb(err, false);

  });

};

// Gets all quotes from database
function getQuotesFromDB(cb) {

  db.db().collection('quotes', function(err, collection) {

    collection.find().toArray(function(err, items) {
      cb(err, items);
    });

  });

};

// Gets indexed/random quote from database
function getQuoteFromDB(cb, index) {

  db.db().collection('quotes', function(err, collection) {

    collection.find().toArray(function(err, items) {

      if (index === undefined)
        cb(err, items[Math.floor(Math.random() * items.length)]);
      else
        cb(err, items[index]);

    });

  });

};

// Exports
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;
exports.getQuoteFromDB = getQuoteFromDB;
exports.jsonQuotes = jsonQuotes;
