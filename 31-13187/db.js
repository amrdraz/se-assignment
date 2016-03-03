var mongo = require('mongodb').MongoClient ; 
console.log('x');
var quotes = require("../quotes.json");
var uri   = 'mongodb://localhost:27017/test';
var DB;
exports.connect =function (cb){
 mongo.connect(uri,function(err,db){
   if(err){
    console.log('error starting connection');
    cb(null);
}
else {
    DB=db;
    console.log("2");
    cb(db);
}
 });
};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};
