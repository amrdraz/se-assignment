var app = require("./app.js").app;
var quotes = require("./quotes.js");
var db = require("./db.js");


db.connect(function(err, database){
	quotes.seed(function(err, seeded){
		app.listen(8080, function(err){
	if(!err){
	console.log("Server Up + Running On Port 8080");
}
else{
	console.log(err);
}
});
	});

	  
     
});

