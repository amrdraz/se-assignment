var express = require('express');
var app = express();
var db = require('./db.js');

app.use(express.static('public'));

app.get('/api/quote', function(req, res, next) {
    db.db().collection('quotes').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

module.exports = app;