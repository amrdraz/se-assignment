/*var express = require('express');
var router = express.Router();
*/
/*
 * GET userlist.
 *//*
router.get('/quotes', function(req, res) {
    var db = req.db;
    var collection = db.get('quotes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

*/

module.exports = function(router){

router.route('/quotes')
        .get(function(req, res, next) {
          // runs for all HTTP verbs first
          var db = req.db;
    var collection = db.get('quotes');
    collection.find({},{},function(e,docs){
        res.json(docs);
          // think of it as route specific middleware!
        })});



}
