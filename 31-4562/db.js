
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'localhost:27017/MyDatabase';

function connect(cb) {

var monk = require('monk');
var DB = monk(dbURL);
cb(DB);
}

exports.db = function() {
    if (DB === null){ 
   connect(function(db){
		DB = db;
		
		});
   return DB;q
}

else{
	return DB
	
}
};

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};

