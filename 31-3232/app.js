var express = require('express');  
var mongo = require('mongodb'); 
var monk = require('monk');   
var quotes = require('./quotes.js');
var DBB =  require('./db.js');

var app = express();  


app.get('/api/quote', function(req,res) { 
  quotes.getQuoteFromDB(function(err,quote){ 
    if(err){  
    	res.send("ERROR");
    }
    else{
    
    res.send(quote);  
}
    }); 
  
});    
app.get('/api/quotes', function(req,res) { 
  quotes.getQuotesFromDB(function(err,quotes){ 
    if(err){  
    	res.send("ERROR");
    }
    else{
    
    res.send(quotes);  
}
    }); 
  
});   

app.use(express.static(__dirname + '/public'));



module.exports = app;