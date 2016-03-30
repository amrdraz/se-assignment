var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  //res.sendfile('index.html', {root: __dirname })
	res.render('index.html');
});

router.get('/showquote', function (req, res) 
{
	res.render('index.html');
	//Show quote here
});

module.exports = router;