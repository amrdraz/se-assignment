var express = require('express');
var router = express.Router();
var db = require('./db.js');

db.connect();
//app.locals.appdata = db.connect();

router.get('/', function (req, res) {
  //res.sendfile('index.html', {root: __dirname })
  res.render('index.html');
});

module.exports = router;