var express = require('express');
var app = express();
var quotes = require('./quotes');
var router = express.Router();
var fs = require('fs');
var path    = require("path");





router.get('/quotes', function (req, res) {

quotes.getQuotesFromDB(function (err, quote) {
	res.json(quote);
    

});});


router.get('/quote', function (req, res) {

quotes.getQuoteFromDB(function (err, quote) {
	res.json(quote);

    

});});



router.get('/', function (req, res) {

 res.sendFile(path.join(__dirname+'/public/index.html'));
});
router.get('/main.js', function (req, res) {

 res.sendFile(path.join(__dirname+'/public/js/main.js'));
});
router.get('/style.css', function (req, res) {

 res.sendFile(path.join(__dirname+'/public/css/style.css'));
});

router.get('/index', function (req, res) {

 res.sendFile(path.join(__dirname+'/public/index.html'));
});

router.get('/index.html', function (req, res) {

 res.sendFile(path.join(__dirname+'/public/index.html'));
});



module.exports = router;

