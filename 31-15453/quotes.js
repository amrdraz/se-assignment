var fs = require('fs');
var dbFile = require('./db.js');

var getElementByIndexElseRandom = exports.getElementByIndexElseRandom = function(array , index){
  if(index == null)
      return array[Math.floor(Math.random() * array.length)];
    return array[index];
  }

var getQuotesFromJSON = exports.getQuotesFromJSON = function() {
  var allQuotes = JSON.parse(fs.readFileSync('../quotes.json', 'utf8'));
  return allQuotes;
}

exports.getQuoteFromJSON = function(index){
  var allQuotes = getQuotesFromJSON();
    return getElementByIndexElseRandom(allQuotes,index);
}




var seed = exports.seed =  function(cb) {
    dbFile.connect(function(_db){
      var collection = _db.get('quotes');
      // console.log('hello');
      var quotes = getQuotesFromJSON();
      var seeded = false;
      var error;
      collection.find({},{},function(err , docs) {
        if(!docs.length)
        {
          collection.insert(quotes);
          seeded = true;
        }
        cb(err,seeded);
        });
    });

};

exports.getQuotesFromDB = function(cb){
    dbFile.connect(function(_db){
    var collection = _db.get('quotes');
    collection.find({},{},function(err , quotes) {
      cb(err,quotes);
    });
  });

};

exports.getQuoteFromDB = function(cb , index){
  dbFile.connect(function(_db){
    var collection = _db.get('quotes');
    collection.find({},{},function(err , quotes) {
      var quote = getElementByIndexElseRandom(quotes,index);
        cb(err,quote);
    });
  });
};
