
//db.js
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/inspireme';
var quotes = require('../quotes.json');

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};
var quote =require('./quotes.js');
var DB = {
     seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('inspireme').insert(quotes, function(err, result) {
                assert.equal(null, err);
                assert.equal(102, result.result.n);
                var allquotes = DB.db().collection('inspireme').find().toArray();
                cb(err);
            });
        });
    },
    connect: function connect(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            _db = db;
            cb(err, db);
        });
    },
   
    db: function db() {
        assert.notEqual(null, _db);
        return _db;
    },
    clear: function clear(done) {
        _db.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                _db.collection(c.name).removeMany();
            });
            done();
        }).catch(done);
    }
    
};




module.exports = DB;