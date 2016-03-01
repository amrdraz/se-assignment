var app=require("./app");
var quoteFunctions=require('./quotes.js');

app.listen(3000, function(){

	console.log("Server up & listening on 3000");

	quoteFunctions.seed(function(err,seeded){
		if(seeded)
		{		
			console.log("Database ready");
		}
		else{
			console.log("Database already seeded!");
		}
	});
});