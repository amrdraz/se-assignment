//var express = require('express');
// var app = express();

// app.use(express.static('./static'));

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/static/index.html');
// });
// app.get('/css/style.css', function(req, res) {
//    res.sendFile(__dirname + '/static/css/style.css'); 
// });
// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });
 var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('static'));

app.get('/api/post', function(req, res, next) {
    db.db().collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

db.connect(function(err) {
    console.log('connected to db');
    db.seed(function () {
        console.log('seeded db');
        app.listen(3000, function() {
            console.log('Example app listening on port 3000!');
        });
    });
});
