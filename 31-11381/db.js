var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/31-11381';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
   mongo.connect(dbURL,function(err,db){
    if(err){ 
        console.log("Connection error");
    }
    DB =db;
    cb(DB);


   });
};



/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */



exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
    if(DB==null){
        this.connect(function(db){
            var quotes = db.collection('quotes');
            quotes.drop();
            
        });
    }
    else
    {
        var quotes = DB.collection('quotes');
        quotes.drop();
    }
    
    done();
    
}