var mongo = require('mongodb').MongoClient;
var uri='mongodb://localhost:27017/quotes';
var DB = null;


exports.connect=function (cb){
  mongo.connect(uri, function(err, db) {
  if(!err) {
    console.log("We are connected");
    DB=db;
    cb(DB);
  }
  else{
    throw err;
  }

});


};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

function clearDB (done) {
    // myDB.listCollections().toArray().then(function (collections) {
    //     collections.forEach(function (c) {
    //         myDB.collection(c.name).removeMany();
    //     });
    //     //console.log(myDB.listCollections().toArray().length+"**************************");
    //     done();
    // }).catch(done);
    DB.collection('quotes').remove({}, function(err,remover){
      done();
    });


};
exports.clearDB = clearDB;
