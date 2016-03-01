var express = require('express');
var app = express();
var database= require('./db');
var quotes=require('./quotes')

module.exports=app;

database.connect(function () { //example here connect is executed first then the cb
data=database.db();
 quotes.setDB(data); //m
 quotes.setQuotesCollection(data.collection('quotes'));
 quotes.seed(function (err,flag){
   console.log(flag);
  //  getQuotesFromDB(function (err ,docs){
    // console.log("I have docs "+ docs[0].author)
 //   });
 })

}); //must do callback to garuntee it does it after connecting
//db.connect();
//to get acess to static pages like js and html
app.use(express.static(__dirname +'/public'));
/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

//Routing
app.get('/api/get', function(req, res) { //should get quotes
    quotes.getQuoteFromDB(function (err ,doc){
if (err) throw err;
      res.send(doc)
    })
});
app.get('/api/quote', function(req, res) { //should get quotes
  quotes.getQuoteFromDB(function (err ,doc){
if (err) throw err;
    res.send(doc)
  })
});
app.get('/api/quotes', function(req, res) { //should get quotes
  quotes.getQuotesFromDB(function (err ,doc){
if (err) throw err;
    res.send(doc)
  })
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

//incase not found
app.get('*', function(req, res) {
    res.send("Error 404 ! Page not found!")
});
