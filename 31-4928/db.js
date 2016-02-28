var mongo = require('mongodb').MongoClient;
var DB = null;
var url = 'mongodb://localhost:27017/SE';




exports.connect = function(callback) {



mongo.connect(url,function(err, conn) {
  
    if (err) console.log('error connecting to mongo');
    else console.log('Connection established to mongo');
    DB=conn;
  
  setTimeout(callback(DB),5000);
 
  });
};



exports.db = function() {

  if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;

};



exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};


