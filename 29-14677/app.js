var database = require('./db');
var quotes = require('./quotes');
var fs = require('fs');

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();


 database.connect(function(err, db) {


    //
    // database.clearDB(function(err, suc2){
    //   console.log(suc2);
    //   console.log(suc2? 'cleared successfuly' : 'failed to clear');
    // });


//   quotes.getQuotesFromJSON(function(err, qu){
//   console.log(qu? 'get successfuly' : 'failed to get');
//   console.log("here");
// });


  quotes.seed(function(err, seeded) {
  //  if(err)  // throw err;

if(!seeded){
    console.log('failed to seed');
    seeded= false ;
return;}
    console.log('Seeded successfuly');
        seeded= true ;


  });



});

// Configuration

app.configure(function(){
  app.set("view options", { layout: false }) ;
  app.set('views', __dirname + '/views');
  app.register('.html', require('handlebars'));
  var handlebars = require('express-handlebars').create({defaultLayout:'main'});
  app.set('view engine', 'handlebars');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// catch 404 and forward to error handler

app.use(function(req, res, next){
  res.status(404);
//for handlebars
app.use(function(request, response, next) {
  response.status(404).render('404');
});

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// Routes

app.get('/', routes.index);
app.get('/index',  routes.index);
app.get('/index.html',  routes.index);
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

// app.use(function(request, response, next) {
//   response.status(404).render('404');
// });


//
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
