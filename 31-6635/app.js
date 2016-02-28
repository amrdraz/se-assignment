var express = require('express');
var path    = require('path');
var app     = express();
var db = require('./db.js');
var fs = require('fs');
var quotes = require('./quotes.js')

app.use(express.static(path.join(__dirname,'public')));


db.connect(function(){

  quotes.seed(function(err,seeded){
    if(err)
    	throw err;
    else if(seeded)
    	 console.log("DB seeded");
    	else console.log("DB has existing records!");


  });

});



app.get('/api/quotes',function(req,res){

res.writeHeader(200,{'Content-type':'application/json'});

quotes.getQuoteFromDB(function(err,quote){
   
   if(err)
    throw err;
else res.end(JSON.stringify(quote));

});

});

app.get('/index',function(req,res){
  
  res.writeHeader(200,{'Content-type':'text/html'});

 res.end(fs.readFileSync('public/index.html'));

});

app.use(function(req,res){
	res.status(404).send("404:Page Not Found");
})


module.exports.app = app;