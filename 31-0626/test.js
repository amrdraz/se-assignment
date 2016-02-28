var db = require('./db.js');

db.connect(function(err, DB){
	if(err){
		console.log('error');
	}else{
		db.clearDB(function(){
			console.log('done clearing db');
		});
	}
});