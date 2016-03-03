var express = require('express');
var router = express.Router();
var DBfile=require('../db');
var quotes=require('../public/quotes');

router.get('/quote', function(req, res) {


    quotes.getQuoteFromDB(function (err, result) {

        res.json(result);

    });


});


router.get('/quotes', function(req, res) {


    quotes.getQuotesFromDB(function (err, result) {
        res.json(result);

    });


});
module.exports = router;

