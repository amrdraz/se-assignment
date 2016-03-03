var express  = require('express');
var http     = require('http');
var app      = express();
var fs       = require('fs');
var quotes   = require('./quotes.js');
var db       = require('./db.js');
var path     = require('path');

app.use(express.static(path.join(__dirname,'public')));

db.connect(function(theDataBase){
      quotes.seed( function(err , seeded){
         if( err ) { console.log('Error seeding')}
         else {console.log('Seeding successful')}
      }) 
})


app.get('/api/quote', function (req, res)
{
  quotes.getQuoteFromDB( function (err , theQuote){
    if( err ){ throw ERROR ('Error getting a quote')}
      else
      {
         res.setHeader('Content-Type', 'application/json');
         res.send( JSON.stringify(theQuote) ) } }) 
})


app.use(function(req, res)
{
  res.status(404).send("ERROR 404: Page not found.");
});

http.createServer(app).listen(3000, function () {
  console.log('Example app listening at http://localhost:3000');
});

module.exports = app