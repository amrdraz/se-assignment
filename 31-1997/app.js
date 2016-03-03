var express = require('express');
var path = require('path');

var app = express();

//Routes
//var index = require("./routes/index");
var api = require("./routes/api");


//Using public folder for static files
app.use(express.static(path.join(__dirname, 'public')));


/* GET home page. */
app.get('/index', function(req, res) {
    res.sendFile(__dirname+'/public/index.html');
});

//Use Routes
app.use("/api", api);

module.exports = app;
