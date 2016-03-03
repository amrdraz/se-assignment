var app = require('./app.js'); 
var DB2 = require('./db.js');   
var quotess = require('./quotes.js');


DB2.connect(function(cb) { 
    quotess.seed(function(cb) {  
          
	   app.listen(8080,function() { 

		   console.log('App listening on port 8080')
		});


    }); 

}); 



   