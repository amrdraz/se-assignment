var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var _db = null;
var dbUrl = 'mongodb://localhost:27017/inspire-me';
var flag = false;


var DB = {

    connect: function connect(cb) {
        MongoClient.connect(dbUrl, function(err, db) {
            if(!err)
            {
              console.log("connected to db inspire me");
              _db = db;
              var app = require('./app.js');
              app.listen(3000, function() {

                  console.log('app listening on port 3000!');


          });
            cb();
            }
            else{
              console.log("error couldn't connect to db inspire me");
            }

        });

    },
    db: function db() {
      if(_db==null)
        {
          console.log("db function has null db");
        }
        else
        {
          console.log("db is NOT NULL!!!");
          return _db;

        }

    },
    connected: function connected()
    {
      return flag;
    }
    ,

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
