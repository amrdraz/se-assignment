var http = require('http');
// var express = require('express');
// var app = require('./app.js');
// var db = require('./Public/db.js');
// var quote =
var app = require('./app.js');
var db = require('./Public/db.js');
var quote = require('./Public/quotes.js');

db.connect(function(err) {
    quote.seed(function () {
        app.listen(8080, function() {
        });
    });
});


// var server = http.createServer( function(req,res) {
//    res.writeHeader(200, {'Content-type':'text/html'});
//         res.end(fs.readFileSync('./Public/index.html'));
// });

var server=http.createServer(function(req,res){
    res.end('test');
});
server.on('listening',function(){
    console.log('ok, server is running');
});

server.listen(8080);

// var PORT = 8080; 
// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:%s", PORT);
// });



// app.use(express.static('static'));

// app.get('/api/post', function(req, res, next) {
//     db.db().collection('post').findOne(function(err, post) {
//         if (err) return next(err);
//         res.send(post);
//     });
// });

//module.exports = app;