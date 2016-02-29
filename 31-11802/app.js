var express = require('express');
var app = express();
var db= require('./db');

module.exports=app;
db.connect();
//to get acess to static pages like js and html
app.use(express.static(__dirname +'/public'));
/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/

//Routing
app.get('/api/get', function(req, res) { //should get quotes
    var post = {
        "title": "Title added with Ajax from a /api/post route",
        "content": "This post's body text was populated with JavaScript"
    }
    res.send(post)
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
/*app.get('/api/post', function(req, res) {
    var post = {
        "title": "Title added with Ajax from a /api/post route",
        "content": "This post's body text was populated with JavaScript"
    }
    res.send(post)
});*/

//incase not found
app.get('*', function(req, res) {
    res.send("Error 404 ! Page not found!")
});
