var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/' | '/index' | '/index.html', function(res) {
  res.send('index');
});

// router.get('/index', function(req, res, next) {
//   res.render('index');
// });

// router.get('/index.html', function(req, res, next) {
//   res.render('index');
// });

module.exports = router;
