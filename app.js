var express = require('express');
var path = require('path');
// var http     = require('http');
var quotes = require('./quotes.js');
var app      = express();
var fs       = require('fs');

app.use(express.static('./public'));

app.get('/index.html',function(req,res){
	response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./public/index.html', function (err, file) {
                if (err) throw err;
                res.send(file);
            });
});


app.get('/index',function(req,res){
	response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./public/index.html', function (err, file) {
                if (err) throw err;
                res.send(file);
            });
});

app.get('/',function(req,res){
	response.writeHeader(200, {'Content-type':'text/html'});
            fs.readFile('./public/index.html', function (err, file) {
                if (err) throw err;
                res.send(file);
            });
});

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