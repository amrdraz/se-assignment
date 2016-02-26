var database = require('../db');
var quotes = require('../quotes');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.hjs', {sentence : 'Click or Tap'});
  });


  app.get('/index.html', function(req, res) {
    res.render('index.hjs', {sentence : 'Click or Tap'});
  });


  app.get('/index', function(req, res) {
    res.render('index.hjs', {sentence : 'Click or Tap'});
  });

  app.get('/api/quotes', function(req, res) {
  	quotes.getQuotesFromDB(function(err, docs) {
  		res.send(docs);
  	});
  });

  app.get('/api/quote', function(req, res) {
  	quotes.getQuoteFromDB(function(err, quote) {
  		res.send(quote);
  	});
  });
  
};
