
var express = require('express');
var path = require('path');

var quote=require('./quotes.js');
var db=require('./db.js');
var api=require('./routes/api');

var app = express();
app.use(express.static('./public'));



app.get('/', function(request, response) {
  response.render('index.html');
});


app.get('/index', function(request, response) {
  response.render('index.html');
});

app.get('/index.html', function(request, response) {
  response.render('index.html');
});

app.use('/api', function(request, response,next) {
  
  // quotes.seed(function(err,seeded){
    request.db=quote;
    next();
  // });
});
app.use('/api',api);
/*app.get('/api/quote', function(request, response,next) {
  
  quote.getQuoteFromDB(function(err, q) {
    response.json(q);
    next();
  });
});

app.get('/api/quotes', function(request, response,next) {
  quote.getQuotesFromDB(function(err, q) {
    response.json(q);
    next();
  });
});*/

/*app.use('/api/quotes',routes);

app.use('/api/quotes',function(req,res,next){
    req.db = getQuotes;
    next();
});*/

/*app.get('/api/quotes', function(req, res) {
    var quotes=getQuotes.getQuoteFromJSON();
    res.send(quotes);
});*/

/*router.get('/quote',function(req,res,next){
    req.db.getQuoteFromDB(function(err,quote){
      res.json(quote);
    });

});

router.get('/qoutes', function(req, res, next) {
  req.db.getQuotesFromDB(function(err,qoute){
    res.json(qoute);
  });
});*/

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

/*app.get('public/css/style.css', function(req, res) {
   res.sendFile(__dirname + '/public/css/style.css'); 
});
*/


/*/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});



  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: {}
      });
  });
*/

module.exports = app;