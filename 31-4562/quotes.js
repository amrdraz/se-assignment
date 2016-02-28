// establishing connection to database 

var databaseConnection = require('./db');
var db = databaseConnection.db();



var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom = function (array , index){
	if(isNaN(index)){
		return array[Math.floor(Math.random()*array.length)];
	}else{
		return array[index];
	}

}


var getQuotesFromJSON = module.exports.getQuotesFromJSON = function (){

	var jasonQuotes = require('../quotes.json');
	return jasonQuotes;

}

var getQuoteFromJSON = module.exports.getQuoteFromJSON = function getQuoteFromJSON(index){
	var quotes = getQuotesFromJSON();
	var randomQoute
	if(isNaN(index)){
		randomQoute = getElementByIndexElseRandom(quotes);
	}else{
		randomQoute = getElementByIndexElseRandom(quotes,index);
  	}
    return randomQoute;
}


var seed = module.exports.seed =  function seed( cb ){

var collection = db.get('quotesCollection');

var quotes = getQuotesFromJSON();



collection.find({} , {} , function(err,res){
	
	var error = '' ;	
	var seeded = false;

	if(err == null){
		

		if(res.length == 0 ){
		for(var i = 0 ; i<quotes.length ; i++){
	collection.insert(quotes[i]);

	seeded = true;
}
	}else{
		error = "quotes are inserted before";
		}
	
	}else{
		
		error = err;
	}
	cb(error,seeded);
});


}
/*

seed(function (err, seeded) {

 console.log("test   "+err + "   " + seeded);
});
*/


var getQuotesFromDB = module.exports.getQuotesFromDB = function  (cb){
	var collection = db.get('quotesCollection');

	collection.find({},{},function(err,res){
      var quotes = [];
      var error;
      if(err==null){
      if (res.length > 0)  
      	{ 
      	 quotes = res ;
      	 error = null;
      	
      	}else{ 
      	seed(function (err1, seeded) {
            error = err;
      	});
      	}
      
      }else{
      	error = err;
      }
     cb(error , quotes);

	});

}

/*
getQuotesFromDB(function (err, quotes) {
   console.log( err +"   "+ quotes.length);
});
*/

var getQuoteFromDB = module.exports.getQuoteFromDB =   function  (cb , index){
   var collection = db.get('quotesCollection');
   
   getQuotesFromDB(function(err,quotes){
    var quote = getElementByIndexElseRandom(quotes,index);

    cb(err,quote);
   });

}
/*
getQuoteFromDB(function (err, quote) {
    // any of quote object in the database  
    console.log(quote);
})
getQuoteFromDB(function (err, quote) {
    // is Kevin Kruse assuming it's the first document in the database
   console.log(quote.author);  
}, 0)
*/
