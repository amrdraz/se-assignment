var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/omranQuotes';

//var quotes = require('./quotes.js');

var connect = function connect(cb) {
    mongodb.connect(dbUrl, function(err, db) {
        assert.equal(null, err);
        _db = db;
        cb(db);
    });
};

var db = function db() {
    if(_db != null){
      return _db;
    }
};

var clearDb = function clearDb(cb) {
    _db.listCollections().toArray().then(function(collections) {
        collections.forEach(function(c) {
            _db.collection(c.name).removeMany();
        });
        cb();
    }).catch(cb);
}


exports.db = db;
exports.connect = connect;
exports.clearDb = clearDb;
