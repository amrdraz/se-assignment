var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var routes2 = require('./routes/users');
var routes3 = require('./routes/click');

var app = express();
var http= require('http');
var fs =require('fs');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:5000/');

app.use(express.static('static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', routes2);
app.use('/click', routes3);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index.html'));
      console.log('AYYYYYYYYYAAAAAAAAAAAAAAAaa');
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

// app.get('/', function(req, res) {
//   res.send("Hello world AYAAAAAA");
//   console.log('AYYYYYYYYYAAAAAAAAAAAAAAAaa');
// });





app.get('/apiquote', function (req, res) {
   fs.readFile('quotes.json', function (err, data) {

    res.setHeader('Content-Type', 'application/json');
       res.send( data );
   });
})




module.exports = app;









// var express = require('express');
// var path = require('path');


// //var monk = require('monk');
// var db = mongo('localhost:27017/nodetest2');
// var routes = require('./routes/index');
// //var users = require('./routes/users');
// // var mongo = require('mongodb');
// // var monk = require('monk');
// // var db = monk('localhost:27017/database2');

// app.use('/', routes);
// //app.use('/', index);
// // return this back!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!app.use('/users', users);
// //what is APIIIIIIIIIII test 
// // var routes = require('./routes/index');
//  var u = require('./routes/users.js');


// // Make our db accessible to our router
// app.use(function(req,res,next){
//     req.db = db;
//     next();
// });


// // app.use('/', routes);
// app.use('/api', u);



// app.get('/', function(req, res) {
//   res.send("Hello world");
// });

// app.get('/api/quote', function (req, res) {
//    fs.readFile('quotes.json', function (err, data) {

//     res.setHeader('Content-Type', 'application/json');
//        res.send( data );
//    });
// })

// // $.UrlExists = function(url) {
// // 	var http = new XMLHttpRequest();
// //     http.open('HEAD', url, false);
// //     http.send();
// //     return http.status!=404;
// // }




// app.get('/', function(req, res) {
//   res.json(quotes.json);
// });




// module.exports = app;
