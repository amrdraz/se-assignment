var express = require('express');
var path = require('path');
// var http     = require('http');
var quotes = require('./quotes.js');
var app      = express();
var fs       = require('fs');

app.use(express.static('./public'));

// app.get('/',function(req,res){
//     fs.readFile('./public/index.html', function (err, file) {
//                 res.status(200).end(file);
//             });
// });

app.get('/index',function(req,res){
    fs.readFile('./public/index.html', function (err, file) {
                res.status(200).end(file);
            });
});

// app.get('/index.html',function(req,res){
//         fs.readFile('./public/index.html', function (err, file) {
//                 res.status(200).end(file);
//             });
//     });




app.get('/api/quote', function(req, res) {
    quotes.getQuoteFromDB(function(err, row){
                //response.ContentType('text/html');
                var quote = {
                "author": row.author,
                "content": row.text,
                "id": row.id
                 }
                 //console.log(quote);
                res.send(quote);
                // response.end(JSON.stringify(quote.author));

            });
});

app.get('/api/quotes', function(req, res) {
    quotes.getQuotesFromDB(function(err, quotes){
      res.send(quotes);
     });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("Ops! page not found!!!");
});



module.exports = app;