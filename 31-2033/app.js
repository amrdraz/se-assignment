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

module.exports = app;
