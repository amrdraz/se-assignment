var express  = require('express');
var http     = require('http');
var app      = express();
var fs       = require('fs');
//var $        = require('jquery');
var quotes   = require('./quotes.js');
var nth      = 0;
/*var router   = express.Router();
//var jque     = require('./public/jusQueryin.js');


router.get('/kappa', function(req, res) {
  
    res.end('MADE IT');
  //  var db = req.db;
  //  var collection = db.get('userlist');
  //  collection.find({},{},function(e,docs){
  //      res.json(docs);
  //  });
});
*/


quotes.seed(function (err, seeded) {
    //if (!err) console.log(seeded); 
});

app.use(express.static(__dirname + '/public'));

app.get('')

//app.use('/gettingjquery', __dirname + '/public/js/jquery.min');

//app.use('jquerying', __dirname + '/public/main');

app.get('/api/quote', function (req, res) {
   
   (quotes.getQuotesFromDB(function (err, entries) {
      nth = (nth===entries.length-1)? 0 : nth+1;
   }))
   //console.log(nth);

   quotes.getQuoteFromDB(function (err, entry) {
      res.send(entry); 
   }, nth);
})

//exports.getEntry = quotes.getQuoteFromDB(function(err, entry){


//},1);

app.get('/api/quotes', function (req, res) {
   
   quotes.getQuotesFromDB(function (err, entries) {
      res.send(entries); 
   });
})


//console.log(quotes.getQuote(++order));

/*$(document).ready(function () {
  //  $(' #inspire ').on( 'click', console.log(/*quotes.getQuote(++order)*///'hi') );
//});


//app.use(express.static('public'));

//app.use('/', function (req, res) {
  //$('body').text("Meep"); 
  //  res.send('hello world');
 // next();
//  $(document).ready($('body').text("Meep"));
//});
/*
app.get('/kappa', function (req, res) {
    console.log("kpa");
    res.end('keepo');
})
*/
app.get('/', function (req, res) {
    
    console.log('kekek');
    res.sendFile(__dirname+'/public/index.html');

   // $(document).ready($('body').text('please work'));
  //  console.log('batata');
});


app.all('*', function(req, res) {

  res.status(404).send('Page Not found! Please try restarting at the home page!');
});

//$(document).ready($('body').text('please work'));

//app.listen(3000);

module.exports = app;
