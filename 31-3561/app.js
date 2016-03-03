
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var mongoose=require('mongoose');
var fs =require('fs');
/*var mongodb = require('mongodb');
var db;
var collections;
mongodb.MongoClient.connect('mongodb://localhost:27017/inspireme', function(err, database) {
  if(err) throw err;
 
  db = database;
  collections = db.collection('quotes');
 
  app.listen(8080);
  console.log('Listening on port 8080');
});
 */

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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

// Routes
mongoose.connect('mongodb://localhost:27017/inspireme');
mongoose.model('quotes',{quotes:String})

app.get('/api/quotes', function(req,res){
  mongoose.model('quotes').find(function(err,quotes){
     var readable = fs.createReadStream('./quotes.json');
    readable.pipe(res);
    
  });
 
});

app.get('/api/quote', function(req,res){
  mongoose.model('quotes').find(function(err,quotes){

     res.send(quotes[Math.floor(Math.random()*quotes.length)]);
  });
 
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
