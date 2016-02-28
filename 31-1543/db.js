var mongoClient = require('mongodb').MongoClient;
var dataB = null;
var dbURL = 'mongodb://localhost:27017/Inspire';

exports.connect = function(cb) {
    mongoClient.connect(dbURL, function(err, db){
      if(!err){
        console.log("Connected to Database");
        dataB =db;
        cb(db);
      }
      else{
        console.log("Error Connecting to Database");
      }
    });
  }

exports.db = function() {
    if (dataB === null) throw Error('DB Object has not yet been initialized');
    return dataB;
};

exports.clearDB = function(done) {
    dataB.listCollections("quotes").toArray().then(function (collections) {
        collections.forEach(function (c) {
            dataB.collection(c.name).removeMany();
        });
        done();
    }).catch(done);
};
