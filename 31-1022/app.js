var express = require('express');
var app = express();
var file=require('./quotes.js');

//var file=require('./quotes.js');

app.use(express.static('./public'));

// app.get('/api/quotes', function(req, res) 
// {
   
//    var quotes = file.getQuotesFromDB();
//     res.send(quotes);
// });

//app.use(require(file.router'));
//app.use(require('./quotes.js'));

// app.get('/api/quote', function(req, res) 
// {
   
//     var quote = file.getQuoteFromDB();
//     res.send(quote);
// });
app.get('/api/quote', function(req, res) {
    var quote= file.getQuoteFromDB(function(err,quote)
    {
 		res.send(quote);
    });
   
});

app.get('/api/quotes', function(req, res) {
    var quotes= file.getQuoteFromDB(function(err,quotes)
    {
 		res.send(quotes);
    });
   
});
 module.exports= app;