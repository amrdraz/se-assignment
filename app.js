var express = require('express');
var app = express();
var db = require('./db.js');
var quotes = require ('./quotes.js');





quotes.seed(function(x,y){
  console.log(x);
  console.log(y);
});



app.get('/api/post', function(req, res) {

  quotes.getQuoteFromDB(function(err,data)
  {
  var author=data.author;
  var said=data.text;
  res.send({
        "author": author,
        "quote": said
    })
});

});







app.use(express.static('public'));





module.exports = app;
