var database = require('../db');
var quotes = require('../quotes');
var fs = require('fs');

module.exports = function(app){

  var home = function(request, response){
    response.render('index.hjs', {
      quote: 'Click me to spread happiness'
    });
  };

  app.get('/', home);
  app.get('/index', home);
  app.get('/index.html', home);

  app.get('/api/quote', function(request, response) {
      quotes.getQuoteFromDB(function(err, quote) {
        response.send(quote);
      });
  });

  app.get('/api/quotes', function(request, response) {
      quotes.getQuotesFromDB(function(err, quotes) {
        response.send(quotes);
      });
  });

  app.use(function(request, response, next) {
    response.status(404).render('404NotFound.hjs');
  });
};
