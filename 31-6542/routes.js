var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/index', function(req, res, next) {
  res.render('index');
});
router.get('/index.html', function(req, res) {
    res.render('index');
});
console.log('hithere correct ');
module.exports = router;


