var express = require('express');
var router = express.Router();


router.get('../quotes', function(req, res) {
    var db = req.db;
    var collection = db.get('quotes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;