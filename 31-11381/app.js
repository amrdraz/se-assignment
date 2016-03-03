var express = require('express');
var app = express();
var quote = require('./quotes.js');
var db = require("./db.js");


app.use(express.static('./public'));

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});



// app.get('/test3',function(req,res){
// 	quote.getQuotesFromDB(function(error, quotes){
// 		res.json(quotes);
// 	});
// });

app.get('/api/quote', function(req, res) {
   		
	   	db.connect(function(db){
		   		quote.seed(function(err,flag){
	   				if(flag==true){
	   					console.log(err+ "true");	
					}
					else{
						console.log(err+"seeded = false");
					}
	   			});
   				quote.getQuoteFromDB(function (err, quote) {
					if(err){
						console.log("there is an error in quote");
					}
					else{
						res.send(quote);
					}
				});
			
				
	   	});
   		
});

app.get('/api/quotes', function(req, res) {
   		
	   	db.connect(function(db){
		   		quote.seed(function(err,flag){
	   				if(flag==true){
	   					console.log(err+ "true");	
					}
					else{
						console.log(err+"seeded = false");
					}
	   			});
   				quote.getQuotesFromDB(function (err, quotes) {
					if(err){
						console.log("there is an error in quotes");
					}
					else{
						res.send(quotes);
					}
				});
			
				
	   	});
   		
});



