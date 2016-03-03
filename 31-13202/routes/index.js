
var quotes = require('../quotes');
var json = require('../quotes.json'); //(with path)
var db = require('../db');
var passed = null;
var arr = quotes.quotes(json);
var randquote = quotes.getQuoteFromJSON(1);
//console.log(randquote);

// db.connect(function(err,db){
// 	if(err){
// 		console.log('error');
// 	}
// });

//console.log(randquote);

// quotes.seed(function(err,seeded){
// 	if(seeded){
// 		console.log('done');
// 	}
// 	else{
// 		console.log('false');
// 	}
// });

// exports.index = function(req, res){
// res.render('index', { title: passed.text , author: passed.author} );};
