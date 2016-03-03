var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/quotesdb';
var DB = {

    connect: function connect(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            _db = db;
            cb(err, db);
        });
    },
    db: function db() {
        return _db;
    },
    clearDB: function clearDB(done) {
      _db.collectionNames(function(err,names){
        assert.equal(null,err);
          _db.collection("quotes").remove({},function(err){
          assert.equal(null,err);
          });
        done();
      });
    }
};

module.exports = DB;
