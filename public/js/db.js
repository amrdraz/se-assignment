var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:8008/';
var DB = null;


exports.connect = function(cb) {

  mongo.connect(dbURL,function(err, db) {
    if (err) {
      console.log('Connection to the Server encountered an unexpected error. aw expected w was not debugged' );
      process.exit(1);
    } else {
      DB = db;
      cb(DB);}
      })
};

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};


exports.db = function() {
    if (DB === null) throw Error('Database is not built yet, gabet null');
    return null;
};
