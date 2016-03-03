var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    db.db().collection('quotes').find().toArray(function(err, quotes) {
        if (err) return next(err);
        res.render('index', {quotes: quotes});
    });
});
    
module.exports = router;