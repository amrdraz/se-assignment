var express = require('express');  
var mongo = require('mongodb'); 
var monk = require('monk');   
var quotes = require('./quotes.js');
var DBB =  require('./db.js');

var app = express();  
//app.use('/', routes);
// app.use('/api/quotes', 'quotes.js');

app.get('/api/quote', function(req,res) { 
  quotes.getQuoteFromDB(function(err,quote){ 
    if(err){  
    	res.send("ERROR");
    }
    else{
    //console.log(quote);
    res.send(quote);  
}
    }); 
  
});   

app.use(express.static(__dirname + '/public'));



module.exports = app;
