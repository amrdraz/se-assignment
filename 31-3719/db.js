var mongo = require('mongodb')
var mongoC = mongo.MongoClient

var url = 'mongodb://localhost:27017/se_1'
var _db

function connect(cb) {
	//if(_db) cb(null)
	mongo.connect(url, function(err, db) {
 			if(err)
 				throw Error("Cannot connect to mongo")

 			_db = db
 			cb(db)
 		})
}

function db() {
	//if(_db === null) throw Error('DB Object has not yet been initialized')
	return _db
}

function clearDB(cb) {
	_db.collection('quotes').deleteMany({}, function(err, res) {
		if(err)
			throw err
		cb()
	})
}

function close(cb){
	if(_db)
	_db.close()
	cb()
}

exports.db = db;
exports.connect = connect
exports.close = close
exports.clearDB = clearDB