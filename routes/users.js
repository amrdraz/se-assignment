var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/quote', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/quotes', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
