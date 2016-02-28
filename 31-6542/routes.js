var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/index.html', function(req, res) {
    res.render('index');
});
router.get('/index', function(req, res) {
  res.render('index');
});

console.log("Server listening on: http://localhost:3000");
module.exports = router;


