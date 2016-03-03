// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.sendFile('project/myapp' + '/static/js/index.html');
// });

// app.get('/', function (req, res) {
//   res.sendFile('project/myapp' + '/static/css/style.css');
// });

// app.use(express.static('./static'));

// app.listen(8080, function () {
//   console.log('Example app listening on port 8080!');
// });

// app.get('/api/post', function(req, res) {
//     var post = {
//         "title": "Title added with Ajax from a /api/post route",
//         "content": "This post's body text was populated with JavaScript"
//     }
//     res.send(post)
// });

var assert = require('assert');
var express = require('express');
var mongodb = require('mongodb').MongoClient;
var app = express();

var DB = null;

mongodb.connect('mongodb://localhost:27017/diary_db', function(err, db) {
    if (err) throw err;
    DB = db;
    var post = {
        "header": "Title added with JavaScript From DB",
        "body": "This post's body text was populated by sending a get request to /api/post"
    };
    // http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateOne
    db.collection('post').updateOne(post, post, {
        upsert: true,
        w: 1
    }, function(err, result) {
        assert.equal(null, err);
        assert.equal(1, result.result.n);
        console.log('Db Connected and one post inserted');
    });
});

app.use(express.static('static'));

app.get('/api/post', function(req, res, next) {
    DB.collection('post').findOne(function(err, post) {
        if (err) return next(err);

        res.send(post);
    });
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});



// var express = require('express');
// var app = express();
// var db = require('./db.js');

// app.use(express.static('static'));

// app.get('/api/post', function(req, res, next) {
//     db.db().collection('post').findOne(function(err, post) {
//         if (err) return next(err);
//         res.send(post);
//     });
// });

// db.connect(function(err) {
//     console.log('connected to db');
//     db.seed(function () {
//         console.log('seeded db');
//         app.listen(8080, function() {
//             console.log('Example app listening on port 8080!');
//         });
//     });
// });