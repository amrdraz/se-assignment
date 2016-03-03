var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/Mark';



exports.connect = function(cb) {
  mongo.connect(dbURL, function(err, db) {
 if(err) throw err;
 else{
   DB=db;
 };
cb(err,db);
});
};
//////////////////////////////////////////////////////

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

///////////////////////////////////////////////////////
exports.clearDB = function(done) {
  console.log("Hello");
    exports.connect(function(err,db){
        db.collection('quotes').drop();
        done();
      });
};
