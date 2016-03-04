// db.js
var mongo = require('mongodb').MongoClient;
var DB=null ;
var dbURL = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
 //
 // exports.connect=mongo.connect(dbURL, function (err, db) {
 //    console.log('connected to db');
 //    DB = db;});

function connect(cb){
  mongo.connect(dbURL,function (err,db){
  if(err) console.log("error connecting to mongodb !")
  else{
    console.log("Connection established at: "+dbURL)  ;
    DB=db;
   cb(db,err);
  }

});
}
exports.connect=connect;

// can do above: db.collection('test').find().toArray(function(err,docs){
//console.log('docs',docs);
//})
/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
exports.db = function() {
  console.log("HELP!");
   if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

//obsolte replaced with clearQuotesFromDB (at quotes)
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
