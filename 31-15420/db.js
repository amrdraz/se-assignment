var mongo = require('mongodb').MongoClient;
var DB = null;
var url = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    mongo.connect(url,cb);
};

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject}
 */
exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB =  function(cb){
    	exports.connect(function(err,db){
        		var quotes = db.collection('quotes');
        	// connect(function(db){
            		if(DB == null)
            			exports.connect(function(err,db){
                            var quotes = db.collection('quotes');
                            quotes.drop();
                            cb();
                    			});
           else{
                        var quotes = DB.collection('quotes');
                        quotes.drop();
                        cb();
                    }

        	});
    	// });
}