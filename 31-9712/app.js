//importing the basic modules

var express = require('express');
var app = express();
var path = require("path")
//db.js file
var db = require("./db")
//quotes.js file
var q = require("./quotes")

//making 'public' our default path
app.use(express.static(path.join(__dirname, 'public')));

//Connecting to Database and seeding
// here seeding has 3 options
// 1- DB is empty
// 2- DB is Already Seeded
// 3- DB hasn't been seeded yet
db.connect(function(db) {
    q.seed(function(err, seeded) {
        if(err) throw err
        if(!seeded)
            console.log("DB was already seeded.")
    })
});


//The default route
app.get('/', function(req, res) {
    res.render('public/index.html');
});

//other alternative to the default router
app.get('/index', function(req, res) {
    res.render('public/index.html');
});


//The one and only api of this app :)
app.get('/api/quote', function(req, res) {
    var quote = q.getQuoteFromDB(function(err, r) {
        if (err) {
            throw Error("Error while getting the quote from DB .. Sorry ")
        }else{
            res.json(r);
        }

    })
});

//Make this app run on port 3000
app.listen(3000,function (){
    console.log('running on port 3000');
});

