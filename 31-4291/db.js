var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/inspire';
var DB = null;



exports.connect = function (cb){
	mongo.connect(dbURL, function (err,db){
			if(err)
				console.log(err);
			else
				console.log("connected the database!");

			DB=db;
			cb(err, db);
		});


}


exports.db = function(){
	// console.log("inside db");//debugging
	if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
}


exports.clearDB = function (cb){
	 DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
}
 
