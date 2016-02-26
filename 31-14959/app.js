var express = require('express');
var app = express();
var path = require('path');
var db = require("./db")
var q = require("./quotes")
//server
app.listen(3000);
//connecting database
db.connect( function (db){
    db.clearDB(function(){
      q.seed( function (err , seed){
        if(seed)
          console.log("Mlena l-DB");
    });
  });
});
//midlware
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// router
app.get('/index' , function (req,res ){
  res.render("index.html");
});
app.get('/' , function (req,res ){
  res.render("index.html");
});
// Router apis
app.get('/api/quotes' , function (req,res ){
  q.getQuotesFromDB( function (err , quotes){
      res.json(quotes);
  });
});
app.get('/api/quote' , function (req,res ){
  q.getQuoteFromDB( function (err , quote){
      res.json(quote);
  });
});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
     res.status(404).send('Page Not Found');
    //  next(err);
});

module.exports = app;
