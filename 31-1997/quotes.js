var db = require('./db');
var quotes = require('./quotes.json');

//Connecting to MongoDB
db.connect(function(err, database) {
    if (err) throw Error("Can't connect to db");
    else {
        console.log("Connected to db");
        seed(function(err, seeded) {
            if (err)
                throw Error("Couldn't Seed");
            else if (seeded)
                console.log("quotes are added to the database");
            else
                console.log("nothing is added to the db");
        });
    }
});

var getElementByIndexElseRandom = function(array, index) {
    if (index !== undefined)
    //Index passed
        return array[index];
    else
        return array[Math.floor(Math.random() * array.length)];
};

var getQuotesFromJSON = function() {
    return quotes;
};

var getQuoteFromJSON = function(index) {
    return getElementByIndexElseRandom(quotes, index);
};

/*
  seed( function (err, seeded) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
});
*/
var seed = function(cb) {
    db.db().collection('quotes', function(err, collection) {

        collection.count(function(err, count) {
            console.log(count);
            if (err) return cb(err, false);
            else if (count !== 0) // it was added before
                return cb(null, false);

            else {
                var quotesFromJSON = getQuotesFromJSON();
                //If Nothing was in quotes.json
                if (quotesFromJSON.length === 0)
                    return cb(null, false);
                else {
                    quotesFromJSON.forEach(function(quote) {
                        collection.insert(quote);
                    });
                    cb(null, true);
                }
            }
        });
    });
};
/* getQuotesFromDB(function (err, quotes) */
var getQuotesFromDB = function(cb) {
    db.db().collection('quotes', function(err, collection) {
        collection.find().toArray(cb);
    });
};

var getQuoteFromDB = function(cb, index) {
    getQuotesFromDB(function(err, quotes) {
        cb(err, getElementByIndexElseRandom(quotes, index));
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
