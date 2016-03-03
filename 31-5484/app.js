var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var fs           = require("fs");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//http://localhost:3000/index.html
app.get('/index.html',function(req,res){
	fs.readFile('quotes.json', function(err,data){
		res.setHeader('content-Type','application/json'); // for the browser
		data= Json.Parse(data); //parsing to json cuz data can come in any format
		res.send(data);
	});
})

//http://localhost:3000/
app.get('/',function(req,res){
	fs.readFile('quotes.json', function(err,data){
		res.setHeader('content-Type','application/json'); // for the browser
		data= Json.Parse(data); //parsing to json cuz data can come in any format
		res.send(data);
	});
})

//http://localhost:3000/index
app.get('/index',function(req,res){
	fs.readFile('quotes.json', function(err,data){
		res.setHeader('content-Type','application/json'); // for the browser
		data= Json.Parse(data); //parsing to json cuz data can come in any format
		res.send(data);
	});
})

//returns a JSON response that was randomly selected from the database
//http://localhost:3000/quote
app.get('/quote',function(req,res){
	fs.readFile('quotes.json', function(err,data){
		res.setHeader('content-Type','application/json'); // for the browser
		data= Json.Parse(data); //parsing to json cuz data can come in any format
		res.send(data);
	});
})

// get quotes
var router = express.Router();
router.get('/quotes', function(req, res) {
    var db = req.db;
    var collection = db.get('quotes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;
