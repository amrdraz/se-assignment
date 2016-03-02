var express = require('express');
var app = express();
var file=require('./quotes.js');
var db=require('./db.js');
var routes= require('./routes/routes.js');



app.use(express.static('./public'));
app.use('/',routes);


app.get('/api/quote', function(req, res) {
    var quote= file.getQuoteFromDB(function(err,quote)
    {
    	
 		res.send(quote);
 		
    });
   
});

app.get('/api/quotes', function(req, res) {
    var quotes= file.getQuotesFromDB(function(err,quotes)
    {
    	
 		res.send(quotes);
 		
    });
   
});

 module.exports= app;