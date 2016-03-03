var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	/////////////////
	var db = req.db;
    var Quotescollection = db.get('quotes');
	Quotescollection.find().({},{},function(e,quotes) {
        
     res.render('index', {quotes: quotes});
});
});
// router.get('/userlist', function(req, res) {
//     var db = req.db;
//     var collection = db.get('usercollection');
//     collection.find({},{},function(e,docs){
//         res.render('userlist', {
//             "userlist" : docs
//         });
//     });
// });




module.exports = router;
