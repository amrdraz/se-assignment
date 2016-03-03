var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var _db = null;
var dbUrl = 'mongodb://localhost:27017/inspire-me';


var DB = {

    connect: function connect(cb) {
        MongoClient.connect(dbUrl, function(err, db) {
            if(!err)
            {
              console.log("connected to db inspire me");
              _db = db;

            cb();
            }
            else{
              console.log("error couldn't connect to db inspire me");
            }

        });

    },
    db: function db() {

          return _db;



    },
    connected: function connected()
    {
      return flag;
    }
    ,

    clearDB: function clearDB(done) {
        _db.listCollections().toArray().then(function(collections) {
            collections.forEach(function(c) {
                _db.collection(c.name).removeMany();
            });
            done();
        }).catch(done);
    }
};

module.exports = DB;
