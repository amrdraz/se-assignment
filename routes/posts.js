// {
//     "title": "Title added with Ajax from a JSON file",
//     "content": "This post's body text was populated with JavaScript"
// }

var db = require('../db.js');
var express = require('express');
var router = express.Router();

router.get('/api/post', function(req, res, next) {
    db.db().collection('post').findOne(function(err, post) {
        if (err) return next(err);
        res.send(post);
    });
});

module.exports = router;