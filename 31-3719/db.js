var mongo = require('mongodb')
var mongoC = mongo.MongoClient

var url = 'mongodb://localhost:27017/se_1'
var _db

function connect(cb) {
	mongo.connect(url, function(err, db) {
 			if(err)
 				throw err

 			_db = db
 			cb(db)
 		})
}

function db() {
	return _db
}

function clear_db(cb) {
	_db.collection('quotes').deleteMany({}, function(err, res) {
		if(err)
			throw err
		cb()
	})
}

function close(cb){
	_db.close()
	cb()
}

exports.db = db;
exports.connect = connect
exports.close = close
