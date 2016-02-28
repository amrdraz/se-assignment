var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';

/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
var connect = exports.connect =
 function(done) {
   mongo.connect(dbURL,function(err,db){
    if(err){ 
        console.log("Error has occured");
        done(err,db);
    }else{
        DB =db;
        done(null,DB);
        }
    


   });
};


exports.db = function() {
    if (DB === null)
    {
        throw Error('DB Object has not yet been initialized');
    }
     else{
        return DB;    
    }
    
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
exports.clearDB = function(done) {
        connect(function(err, db){
            if(err){
                done(err);
            }else{
                db.collection('quotes').drop();
                done(null);
            }
           
        });
        
    
};
