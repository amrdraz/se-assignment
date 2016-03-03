var fs       = require('fs');
var express = require('express');
var quotes   = require('../quotes.js');

module.exports = function (app) {

  app.get('/index', function (req, res) {
    res.sendFile(__dirname+ '/../public/index.html')
  })
  app.get('/api/quote', function (req, res) {
    quotes.getQuoteFromDB(function(err,quote){
      if (err) {
           throw err;
       }

       //console.log(quote);
        res.send(JSON.stringify(quote));
    })

  });

  app.get('/api/quotes', function (req, res) {
    quotes.getQuotesFromDB(function(err,quotes){
      if (err) {
           throw err;
       }

       res.send(JSON.stringify(quotes));
    })
  });
}
