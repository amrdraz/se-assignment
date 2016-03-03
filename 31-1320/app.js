var express  = require('express');
var http     = require('http');
var app      = express();
var path = require("path");
var DB = require('./db.js');
var quotes = require('./quotes.js');


app.use(express.static(path.join(__dirname,'public')));

//connect and seed

 DB.connect(function(database){
 	quotes.seed(function(error,seeded){
	if(seeded){
		console.log('seeded');
	}else{
		console.log('an error occured');
	}
})
 });

app.get('/api/quote', function (req, res) {
   res.setHeader('Content-Type','application/json');
   quotes.getQuoteFromDB(function (err,data){
   res.send(JSON.stringify(data));
});
})

app.get('/api/quotes', function (req, res) {
   res.setHeader('Content-Type','application/json');
   quotes.getQuotesFromDB(function (err,data){
   res.send(JSON.stringify(data));
});
})

app.use(function(req, res) {
     res.send('404: Page not Found', 404);
  });

app.listen(3000,function()
{
	  console.log('Example app listening at http://localhost:3000');

})


module.exports = app;