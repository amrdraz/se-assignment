var app=require("./app");
var quoteFunctions=require('./quotes.js');
var db=require("./db.js");
var port = process.env.PORT || 8080;


db.connect( function(){

	quoteFunctions.seed(function(err,seeded){
		if(seeded)
		{
			console.log("Database ready");
		}
		else{
			console.log("Database already seeded!");
		}
		app.listen(port, function(){
			console.log("Server up & listening on "+port);
		});
	});
});
