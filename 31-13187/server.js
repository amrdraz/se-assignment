var http = require('http');
var db = require('./db.js');
var app = require('./app.js');
var quotes = require('./quotes.js');
db.connect(function(data){
	quotes.seed(function(err, seeded){
		// console.log(seeded);
		console.log("server is listening");
		app.listen(8000);
	});
});

// var handleRequest = function handleRequest(request, response){
//    if(request =="GET"){
//         response.writeHeader(200, {'Content-type':'text/html'});
//       response.end(fs.sendFile('./public/index.html'));
//     }
//    else
//      {
//         response.writeHeader(404, {'Content-type':'text/html'});
//         response.end(fs.readFileSync('./app/404.html'));
//     }
// };
// var server = http.createServer(handleRequest);

// var PORT = 8080; 
// server.listen(PORT, function(){
//     console.log("Server listening on: http://localhost:%s", PORT);
// });


// http.createServer(app).listen(8000,function(){
// 	console.log("server is on 8080");
// });


console.log('Server is up and running');
