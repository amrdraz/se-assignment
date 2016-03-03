
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;
var _db = null;
var dbUrl = 'mongodb://localhost:27017/diary_db';
var post = {
    "header": "Title added with JavaScript From DB",
    "body": "This post's body text was populated by sending a get request to /api/post"
};
var fs = require("fs");
console.log("Starting");
var d = []; 
fs.exists("./quotes.json", function(fileok){
  if(fileok)fs.readFile("./quotes.json", function(error, data) {
  
   var parsed = JSON.parse(data);
   for(var y in parsed){
   d.push(parsed[y]);
                       }
  });
  else console.log("Error");
});
console.log("Continue");
var DB = {
     seed: function seed(cb) {
        DB.clear(function(err) {
            assert.equal(null, err);
            DB.db().collection('post').insertMany(d, function(err, result) {
                assert.equal(null, err);
               
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