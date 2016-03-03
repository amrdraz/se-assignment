//contains code that handles the routes and exports the express app.
var express = require('express');
var mongo = require('mongodb');
var db = require('./public/db.js');
var q = require('./quotes.js');
//create the app.
var app = express();

app.use(express.static('./public'));

app.listen(3000, function () {
  console.log('listening on port 3000');
});

db.connect(function(err){
  console.log('connected');
  q.seed(function(err,seeded){
    if(seeded)
      console.log('database seeded');
  });
});

app.get('/api/quotes', function (req, res) {
    q.getQuotesFromDB(function (err, quotes) {
    if(err)
      throw console.log("did not find quotes");
    else
      res.json(quotes);
  })
})

app.get('/api/quote', function (req, res) {
   q.getQuoteFromDB(function (err, quote) {
    if(err)
          throw console.log("did not find quote");
    else
      res.json(quote);
  })
})

app.use(function(req, res) {
     // res.send('404: Page not Found', 404);
     res.status(404).send("404: Page not found.")
  });















