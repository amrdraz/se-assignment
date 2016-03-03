var app = require('./app.js');
var db = require('./db.js');
var quotes = require('./static/js/quotes.js');

db.connect(function(err , db){

        quotes.seed(function(err,seeded){
        	if(err == null){
		        app.listen(3000, function () {
                console.log('Server listening on port 3000');
               });
        	}
        	else{
        		console.log(err);
        	}
        });
        
});

