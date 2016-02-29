var quotes = require('../quotes.json');
var db = require('./db.js');
// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
var util = require('util');
// var url = 'mongodb://localhost:27017/inspire-me';


var getElementByIndexElseRandom = function (array, index) {
  if (arguments.length === 1) {
    var randomIndex = Math.floor((Math.random() * array.length) + 0);
    return array[randomIndex];
  } else {
    return array[index];

  }
}

var getQuotesFromJSON = function() {
  return quotes;
}

var getQuoteFromJSON =  function(index) {
  if (arguments.length === 1)
    return getElementByIndexElseRandom(getQuotesFromJSON(), index);
  else
    return getElementByIndexElseRandom(getQuotesFromJSON());

}

var seed = function (cb) {
  db.connect( function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      // console.log('Connection established to', url);

      var error;
      var seeded;

      var collection = db.collection('quotes');

      collection.count(function(err, count) {
        console.log("The count is " + count)
        if (!err && count === 0) {
          collection.insert(getQuotesFromJSON(), function(err, result) {
            if (err) {
              // console.log(err);
              return cb(err, false);
            } else {
              seeded = result;
              return cb(error,true);
            }
          });
        } else {
          return cb("Records already in the database", false);

        }
      });
    }
  });
}

var getQuotesFromDB  = function (cb, index) {
  var error;
  var data = [];
  var argumentLength = arguments.length;
  db.connect( function(err, db) {
    if (err) {
      // console.log('Unable to connect to the mongoDB server. Error:', err);
      error = err;
    } else {
      // console.log('Connection established to', url);
      var collection = db.collection('quotes');
      var cursor = collection.find();
      if ( argumentLength === 1) {
        cursor.each(function(err, item) {
          if (err) {
            error = err;
            return cb(error, data);
          }
          // If the item is null then the cursor is exhausted/empty and closed
          if (item == null) {
            return cb(error, data);
          }
          data.push({"quote":item});
        });
      } else {
        cursor.toArray(function(err, array) {
          return cb(error, {"quote" :array[index]});
        });
      }
    }
  });


}


module.exports = {
  getElementByIndexElseRandom: getElementByIndexElseRandom,
  getQuotesFromJSON: getQuotesFromJSON,
  getQuoteFromJSON: getQuoteFromJSON,
  seed: seed,
  getQuotesFromDB: getQuotesFromDB
};
