var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/zeina31-3002';

var DB = {
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
    clearDB: function clearDB(done) {
            console.log("cleared the DB");
        _db.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                _db.collection(c.name).removeMany();
            });
            done();
        }).catch(done);
    }
};

module.exports = DB;