var express = require('express');
var app = express();
var path = require("path")
var db = require("./db")
var q = require("./quotes")

app.use(express.static(path.join(__dirname, 'public')));

db.connect(function(db) {
    q.seed(function(err, seeded) {
        if(err) throw err
        if(!seeded)
            console.log("DB was already seeded.")
    })
});


app.get('/', function(req, res) {
    res.render('public/index.html');
});

app.get('/index', function(req, res) {
    res.render('public/index.html');
});



app.get('/api/quote', function(req, res) {
    var quote = q.getQuoteFromDB(function(err, r) {
        if (err) throw Error("Error while getting the quote from DB .. Sorry ")
        res.json(r)
    })
});
app.listen(3000,function (){
    console.log('running on port 3000');
});

