<<<<<<< HEAD
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
=======
var express = require('express');
var app = express();
var path = require("path")
var db = require("./db")
var q = require("./quotes")

app.use(express.static(path.join(__dirname, 'public')));

>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
db.connect(function(db) {
    q.seed(function(err, seeded) {
        if(err) throw err
        if(!seeded)
            console.log("DB was already seeded.")
    })
});


<<<<<<< HEAD
//The default route
=======
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
app.get('/', function(req, res) {
    res.render('public/index.html');
});

<<<<<<< HEAD
//other alternative to the default router
=======
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
app.get('/index', function(req, res) {
    res.render('public/index.html');
});


<<<<<<< HEAD
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
=======

app.get('/api/quote', function(req, res) {
    var quote = q.getQuoteFromDB(function(err, r) {
        if (err) throw Error("Error while getting the quote from DB .. Sorry ")
        res.json(r)
    })
});
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
app.listen(3000,function (){
    console.log('running on port 3000');
});

