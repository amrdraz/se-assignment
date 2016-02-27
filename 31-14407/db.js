var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/31-14407';
var myDB = null;

exports.connect = function(cb) {
  mongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the Server', err);
      throw err;
    } else {
    console.log('Connection established to', url);
    myDB=db
    cb(myDB);
  }
  });
};
exports.db = function() {
    if (myDB === null) throw Error('DB Object has not yet been initialized');
    return myDB;
};
//the method clear DB works in an ambigous manner ....
function clearDB (done) {
    // myDB.listCollections().toArray().then(function (collections) {
    //     collections.forEach(function (c) {
    //         myDB.collection(c.name).removeMany();
    //     });
    //     //console.log(myDB.listCollections().toArray().length+"**************************");
    //     done();
    // }).catch(done);
    myDB.collection("quotes").remove({}, function(err,remover){
      done();
    });


};
exports.clearDB = clearDB;
