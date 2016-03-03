var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/quotes_db';
var quote = {
    "Author": "Author name with JavaScript From DB",
    "Content": "This quote's text was populated by sending a get request to /api/quote"
};



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
    clear: function clear(done) {
        _db.dropDatabase(function(err,res){
            if(err) throw err;
            else done();
        });
    }
};

module.exports = DB;