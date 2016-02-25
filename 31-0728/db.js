
var DB;

var connect = function connect(callback)
{
	var mongo = require('mongodb').MongoClient;
	mongo.connect('mongodb://localhost:27017/app', function (err, db) {
	
	if(error)
		throw error;
	
	DB = db;
    callback(db);
	
	});	
}



var db = function db()
{
	return DB;
}

