var express = require('express');
var app = express();
var path = require('path');
var db = require("./db")
var q = require("./quotes")
//server
app.listen(3000);
//database
db.connect( function (db){
    q.seed( function (err , seed){
      if(!seed)
        console.log("Kolo Fol");
    });
});
//midlware
app.use(express.static(path.join(__dirname, 'public')));
// router
app.get('/' , function (req,res ){
  res.render("/public/index.html");
});
app.get('/index' , function (req,res ){
  res.render("/public/index.html");
});
app.get('/index.html' , function (req,res ){
  res.render("/public/index.html");
});
// Router apis
app.get('/api/quotes' , function (req,res ){
  q.getQuotesFromDB( function (err , quotes){
      res.json(quetes);
  });

});
app.get('/api/quote' , function (req,res ){
  q.getQuoteFromDB( function (err , quote){
      res.json(quote);
  });

});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
     res.send('404: Page not Found', 404);
     // next(err);
});

module.exports = app;
