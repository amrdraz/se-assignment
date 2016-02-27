
/**
 * Module dependencies.
 */
 
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require("path");
var express = require('express');
var http = require('http');
var app = express();
var fs = require('fs');
var db = require('./db.js');
var quotes = require('./quotes.js');

app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(db2) 
{
  quotes.seed(function(err, seeded)
  {
    if(err)
    {
      throw err
    }
    else
    {
      if(seeded)
      {
        console.log("Seeded DB."); 
      }
      else
      {
        console.log("DB is already seeded."); 
      }
    }
  });

});

app.get('/api/quotes', function (req, res) 
{
  res.writeHeader(200, {'Content-type':'application/json'});

  quotes.getQuotesFromDB(function(err,quotes)
  {
    if(err)
    {
      throw Error("ERROR:Could not retrieve quote.");
    }
    else
    {
        res.end(JSON.stringify(quotes));
    }
  });

});

app.get('/api/quote', function(req, res)
{
  res.writeHeader(200, {'Content-type':'application/json'});

  quotes.getQuoteFromDB(function(err, _quote)
   {
    if (err)
    {
      throw Error("ERROR:Could not retrieve quote.");
    }
    else
    {
      res.end(JSON.stringify(_quote));      
    }
  });
});

// /index.html and / are already handled by express or node or something im not sure

app.get('/index', function(req, res) 
{
  res.writeHeader(200, {'Content-type':'text/html'});
  res.end(fs.readFileSync('public/index.html'));
});

app.use(function(req, res)
{
  res.status(404).send("ERROR 404: Page not found.");
});


module.exports = app;