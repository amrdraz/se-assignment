var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/QuotesDB';

function connect(cb){
    mongodb.connect(dbUrl, function(err, db) {
        assert.equal(null, err);
        _db = db;
       cb(err, db);
    });
}
exports.connect = connect;
function db(){
    assert.notEqual(null, _db);
    return _db;
}
exports.db = db;
function clearDb(cb){
    _db.listCollections().toArray().then(function(collections) {
        collections.forEach(function(c) {
            _db.collection(c.name).removeMany();
        });
        cb();
    }).catch(cb);
}
exports.clearDB = clearDb;


