var express = require('express');
var path = require('path');
var app = express();
var db = require("./db.js");
var quotes = require("./quotes");

app.use(express.static(path.join(__dirname, 'public')));

 db.connect(function(err, db) {
    quotes.seed(function(err, seeded) {
      if(seeded==true){
        console.log("inserted");
      };
   });
  });
 
  
 app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
 app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
 app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
  app.get('/api/quote', function(req, res){
     quotes.getQuoteFromDB(function(err, quote) {
        res.send(quote); 
        //res.status(202).send(quote);

     });
  });
  
  app.get('/api/quotes', function(req, res){
     quotes.getQuotesFromDB(function(err,items){
    res.send(items);
     //res.status(202).send(items);
   });
  });

  app.get('*', function(req, res){
      //res.send("404 error File Not Found!", 404);  
          res.status(404).send("404 error File Not Found!");
  });




module.exports = app;