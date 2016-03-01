var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/31-12012';

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
    clearDb: function clearDb(done) {

    	_db.collection("quotes").remove({}, function(err, after){
    		assert.equal(null, err);
    	});
    	done();
    	
        // _db.listCollections().toArray().then(function(collections) {
        // 	console.log('hi2');
        //     collections.forEach(function(c) {
        //     	console.log('hi3');
        //         _db.collection(c.name).removeMany();
        //     });
        //     done();
        // }).catch(done);
    }
};

module.exports = DB;