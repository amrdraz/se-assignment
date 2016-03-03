var express= require('express');
var db = require("./db");
var app= express();
var bla= require("./quotes.js");
app.get('/', function (req, res){
  res.sendFile(__dirname+ '/static/index.html');
});
app.get('/index', function (req, res){
  res.sendFile(__dirname+ '/static/index.html');
});
app.get('/index.html', function (req, res){
  res.sendFile(__dirname+ '/static/index.html');
});

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/static/index.html');
// });
// app.get('/', function(req, res) {
//
// });

console.log('ana hna fl app.js ');
app.get('/api/quote', function(req, res) {

    console.log('ana hna fl app.js hacall getQuote method');
    bla.getQuoteFromDB(function(err,quote){
        console.log('ana hna fl app.js called getQuote method');
        console.log(quote);
        var post = {
            "header": quote.text,
            "content": quote.author
        }
        res.send(post);
        //   console.log('ana hna fl app.js '+post);
        // res.send(quote.author);
        //   console.log('ana hna fl app.js '+quote.author);

    });
});
app.get('/api/quotes', function(req, res) {
    console.log('ana hna fl app.js hacall getQuotes method');
    bla.getQuotesFromDB(function(err,quotes){
        console.log('ana hna fl app.js called getQuotes method');

    res.send(quotes);
    });
});


// app.get('/api/quotes', function(req, res) {
//     // var post = {
//     //     "header": "Title added with Ajax from a /api/post route",
//     //     "body": "This post's body text was populated with JavaScript"
//     // }
//     console.log('ana hna fl app.js hacall getQuote method');
//     bla.getQuotesFromDB(function(err,quote){
//       console.log('ana hna fl app.js called getQuote method');
//         res.send(quote.text);
//           console.log('ana hna fl app.js '+quote.text);
//         res.send(quote.author);
//           console.log('ana hna fl app.js '+quote.author);

//     });


//});

app.use(express.static('./static'));
  // var seeded = (check db empty or not);

db.connect(function(err) {
    console.log("err " + err);
    bla.seed(function() {
        app.listen(process.env.PORT || 3000, function(){
            console.log('HTTP Server running on port 3000!');
        });
    });
});
