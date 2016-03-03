
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/quotes_db';

var post = [{
    "author": "This should be the author",
    "quote": "This should be the quote"
}];

var post2 = [{
    "author": "",
    "quote": ""
}];

/*var insertDocument = function(db, callback) {
   db.collection('post').insertOne( {
    "header": "Title added with JavaScript From DB",
    "body": "This post's body text was populated by sending a get request to /api/post",
    "third": "sdasdasd"
},
    {
    "header": "Title2 added with JavaScript From DB",
    "body": "This2 post's body text was populated by sending a get request to /api/post",
    "third": "sdasdasd2"
}, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted two documents into the post collection.");
    callback();
  });
};
*/
var DB = {
     seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insert(post, function(err, result) {
                assert.equal(null, err);
                assert.equal(1, result.result.n);
                cb(err);
            });
            console.log("db cleared and new data inserted")
        });
    },
    connect: function connect(cb) {
        mongodb.connect(dbUrl, function(err, db) {
            assert.equal(null, err);
            _db = db;
            cb(err, db);
        });
        console.log("step 2");
    },
    db: function db() {
        assert.notEqual(null, _db);

        console.log("step 3");
        return _db;
    },
    clear: function clear(done) {
        _db.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                _db.collection(c.name).removeMany();
            });
            done();
            console.log("step 4");
        }).catch(done);
    }
};


module.exports = DB;