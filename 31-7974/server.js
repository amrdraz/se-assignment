var db = require('./db');

var connectToDB = function(cb) {
	db.connect(function(err, d) {
		if (err)
			throw err;
		else {
			console.log('connected');
			console.log('tried seeding?');

			seed(function(err, seeded) {
				if (seeded)
					console.log('seeded succesfully');
				else
					console.log('didn\'t seed');
				cb();
			});
		}
	});
}


var seed = function(cb) {
	db.db().collection('quotes').find().toArray(function(err, docs) {
		if (docs.length == 0) {
			console.log('empty');
			var fs = require('fs');
			fs.readFile('../quotes.json', 'utf8', function (err, data) {
				if (err) 
					throw err;
				var json = JSON.parse(data);

				db.db().collection('quotes').insert(json, function(err, doc) {
					if(err)
						throw err;
					cb(err, true);
				});
			});
		}
		else {
			console.log('not empty');
			cb(err, false);
		}
	});
}

module.exports = {
	connectToDB: connectToDB,
	seed: seed
};

