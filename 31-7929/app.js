var express = require('express');
var path = require('path');
var app = express();
var db = require("./db");
var quotes = require("./quotes");


// view engine setup
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.use(express.static(path.join(__dirname, 'public')));

 db.connect(function(err, db) {
    quotes.seed(function(err, seeded) {
      if(seeded==true){
        console.log("inserted");
      };
   });
  });

  app.get('', function(req, res) {
    res.render("./public/index.html");  // to render the file whenever requested
  });
  
  app.get('/api/quote', function(req, res){
     quotes.getQuoteFromDB(function(err, quote) {
        res.send(quote); //one random quote

     });
  });
  
  app.get('/api/quotes', function(req, res){
     quotes.getQuotesFromDB(function(err, quotes1) {
        res.send(quotes1);  //all quotes 

     });
 	 //res.send(quotes.getQuotesFromDB());
  });


  app.get('*', function(req, res){
      //res.send("404 error File Not Found!", 404); //any other request will give error 404 not found 
        res.status(404).render("error.html");
  });

app.listen(8000, function() {
 		console.log("Listening on port 8000...");
 });

module.exports = app;
