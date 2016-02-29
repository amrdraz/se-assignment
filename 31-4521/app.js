var express = require('express');
var quotes = require('./quotes');
var util = require('util');
var app = express();


app.get('/api/quote', function(req, res) {
  quotes.getQuotesFromDB(function(err, data) {
      res.send(data);
    // console.log("The error is " + err + "  The data is " + util.inspect(data));
  }, Math.floor((Math.random() * 102) + 0));

});

app.get('/api/quotes', function(req, res) {
  quotes.getQuotesFromDB(function(err, data) {
      res.send(data);
    // console.log("The error is " + err + "  The data is " + util.inspect(data));
  });

});
app.use('/', express.static('public'));

app.get('*', function(req, res){
  res.send('404 Not found', 404);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

module.exports =  {
  app:app
};
