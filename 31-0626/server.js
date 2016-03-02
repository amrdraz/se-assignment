var app = require("./app.js");
var db = require('./db.js');



db.connect(function(err, DB){
	if(err){
		return console.log("Error");
	}
	var quotes=require('./quotes.js');
	quotes.seed(function(err, seeded){
		if(err){
			console.log("ERROR!");
		}else{
		
			console.log("success");
			app.listen(3000, function() {
            console.log('[ok]INSPIRE ME IS NOW UP AND RUNNING ON PORT 3000');
        });
		}
	});
});

