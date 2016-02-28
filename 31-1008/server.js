var http = require('http');
var path = require('path');
var express = require('express');
var server = express();
var favicon = require('serve-favicon');
var methodOverride = require('method-override');
var session = require('express-session');
var multer = require('multer');
var errorHandler = require('errorhandler');
var fs = require('fs');
var app = require('./app');
var DB = require('./db.js');
var quotes = require('./quotes.js');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var assert = require('assert');
//var ObjectId = mongo.ObjectID;
var url = 'mongodb://localhost:27017/test';
var database = null;
/*MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
    DB.connect();
 
});*/



MongoClient.connect('mongodb://localhost:27017/diary_db', function(err, db) {
    if (err) throw err;
    database = db;
    var quotes = JSON.parse(fs.readFileSync('../quotes.json', 'utf8'));
    
     //function (err, result){
      //assert.equal(null, err);
       // assert.equal(1, result.result.n);
        console.log('Db Connected');
    //}
});



//var quotes = require('/quotes.js');
//var jQuery = require('./public/js/jquery-1.12.0.js');
//var main = require('./public/js/main.js');
var jQuery = require('./public/js/jquery-1.12.0.js');






// viewed at http://localhost:8080
var port = 8080;
app.set('port', process.env.PORT || 8080);
/*server.get('/', express.static(path.join(__dirname, '/')));

server.get('js', express.static(path.join(__dirname, '/public')));

server.get('js',express.static(path.join(__dirname, '/public')));*/
server.use(express.static(path.join(__dirname, '/public')));

//server.use('html', express.static(path.join(__dirname, '/home/yasmeenwafa/Desktop/se/index.html')));

server.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var server = http.createServer(app);
server.listen(port);



/*server.use(function(req,res,next){ 
    req.DB = DB; 
    next(); 
}); */

//server.use('/quotes', quotes);
//var server = http.createServer(handleRequest);
 //http.createServer(server).listen(server.get('port'), function(){
   //console.log('Express server listening on port ' + server.get('port'));
 //});

//server.listen(8080,function(){
  //  console.log("serverlistening on http://localhost:%s", 8080);
//});

module.exports = server;

