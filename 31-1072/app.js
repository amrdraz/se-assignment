var express = require('express');
var app = express();
var db = require('./db.js');
var quotes = require ('./quotes.js');




db.connect(function(err) {
                app.listen(3000, function() {

                  console.log('app listening on port 3000!');
                  quotes.seed(function(x,y){


          });

});

});
app.use(express.static('./public'));


app.get('/api/quote', function(req, res) {

  quotes.getQuoteFromDB(function(err,data)
  {
  res.send(data);
});

});

app.get('/api/quotes', function(req, res) {

  quotes.getQuotesFromDB(function(err,data)
  {
    res.json(data);
});

});



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});





//app.use(express.static('public'));





module.exports = app;