// server.js

var http = require('http');
var fs = require('fs');
var app=require('./app');
var db=require("./db.js");
var quote=require("./quotes.js");
/*var handleRequest = function handleRequest(request, response){
    if (request.url==='/index.html') {
        response.writeHeader(200, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/index.html'));
    } else {
        response.writeHeader(404, {'Content-type':'text/html'});
        response.end(fs.readFileSync('./app/404.html'));
    }
};*/



app.listen(3000, function () {
   console.log('Example app listening on port 3000!');
  });

//var server = http.createServer(handleRequest);
db.connect(function(err, database){
  if (err) throw Error("Unable to connect to db");
  else{
    console.log("Connected to database!");
    quote.seed (function(err, seeded){
    if (err)
      throw Error("Couldn't seed.");
    else if (seeded)
      console.log("Quotes are added to database.");
    else
      console.log("Nothing's added to database.");
    });
  }
});


// var PORT = 8080; 
// http.createServer(app).listen(PORT,function(){
// 	console.log("Server listening on: http://localhost:%s"+ PORT);
// })

// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:%s", PORT);
// });