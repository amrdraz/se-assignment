var db = require('./db.js');

exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array, index) {
    if(index !== undefined) {
        return array[index];
    }
    return array[Math.floor(Math.random() * array.length)];
}

exports.getQuotesFromJSON = function getQuotesFromJSON() {
    var quotes = require('../quotes.json');
    return quotes;
}

exports.getQuoteFromJSON = function getQuoteFromJSON(index) {
    return this.getElementByIndexElseRandom(this.getQuotesFromJSON(), index);
}

exports.getQuotesFromDB = function getQuotesFromDB(cb) {
    return db.db().collection('quotes').find().toArray(cb);
}

exports.getQuoteFromDB = function getQuoteFromDB(cb, index) {
    var self = this;
    this.getQuotesFromDB(function(err, quotes) {
        if(err) {
            cb(err, null);
        }else {
            var quote = self.getElementByIndexElseRandom(quotes, index);
            cb(null, quote);
        }
    })
}

exports.seed = function seed(cb) {
    var self = this;
    db.db().collection('quotes').count(function(err, cn) {
        if(cn === undefined || cn === 0) {
            db.db().collection('quotes').insert(self.getQuotesFromJSON(), function(err, ins) {
                if(err) {
                    cb(err, false);
                }else {
                    cb(null, true);
                }
            });
        }else {
            cb(null, false);
        }
    });
}
