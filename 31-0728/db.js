

var mongo = require('mongodb');
var DB = null;
var dbURL = 'mongodb://localhost:27017/inspire-me';
var monk = require('monk');


var connect = function connect(callback) {
	DB = monk(dbURL);
	callback(DB);
};



var db = function() {
    return DB;            
}



var clearDB = function(done) {
    DB.get('quotes').drop();
    	done();
};



exports.connect = connect;
exports.db = db;
exports.clearDB = clearDB;
