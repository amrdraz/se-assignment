var fs = require('fs');
var dbFile = require('./db.js');
var db;

dbFile.connect(function(err, _db){ db = _db; });


var getElementByIndexElseRandom = exports.getElementByIndexElseRandom = function(array, index){
    if(index >= 0 && index < array.length)
        return array[index];
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

var getQuotesFromJSON = exports.getQuotesFromJSON = function(){

    return JSON.parse(fs.readFileSync('../quotes.json', 'UTF-8'));
}

var getQuoteFromJSON = exports.getQuoteFromJSON = function(index){
    var quotes = getQuotesFromJSON();
    return getElementByIndexElseRandom(quotes, index);
}

var seed = exports.seed = function(cb){
    var quotes = db.get('quotes');
    quotes.find({}, {}, function(err, docs){
        var seeded = false;
        if(!docs.length)
        {
            quotes.insert(getQuotesFromJSON());
            seeded = true;
        }
        cb(err, seeded);
    });

};

var getQuotesFromDB = exports.getQuotesFromDB = function(cb){
    var quotes = db.get('quotes');
    quotes.find({}, {}, function(err, docs){
        cb(err, docs);
    });
};

var getQuoteFromDB = exports.getQuoteFromDB = function(cb, index){
    getQuotesFromDB(function(err, quotes){
        var quote = getElementByIndexElseRandom(quotes, index);
        cb(err, quote);
});
};
