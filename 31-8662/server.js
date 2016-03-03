// server.js

var app = require('./app.js');
var quotes = require('./quotes.js');
var PORT =8089;
quotes.seed(function(err,seeded){
  if (err) {
       return console.log(err.message);
   }
   console.log(seeded);
   app.listen(PORT,function(){
       console.log("Server listening on: http://localhost:%s", PORT);
   })
});
