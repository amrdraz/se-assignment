var db = require('./db.js');
var quotes = require('../quotes.json');


/*db.connect(function(err, db){
	if (err) throw err;
});*/

var getElementByIndexElseRandom = function (array , index){
	if(index == null)
		return array[Math.floor(Math.random() * array.length)];
	else
		return array[index];
}

var getQuotesFromJSON = function(){
	return quotes;
}

var getQuoteFromJSON = function(index){
	return getElementByIndexElseRandom(getQuotesFromJSON(), index);
}

var seed = function (callback) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
    var q = db.db().collection("quotes");
    q.count(function(error, count){
    	if (error) {
    		callback(error, false);
    		throw error;
    	}
    	else{
    		if(count == 0){
    		//for(var i=0; i<quotes.length; i++){
                q.insertMany(quotes);
            //}
      
    		callback(error, true);
    		console.log("Quotes are added to the database successfully");
    	}
    	else{
    		callback(error, false);
    		console.log("Records already exist");
    	}
    	}
    });
    
}



var getQuotesFromDB = function (cb) {
    // any of quote object in the database 
    db.db().collection("quotes").find({}).toArray(function(err, quotes) {

			cb(err, quotes);
	}); 
}

var getQuoteFromDB = function(cb, index) {
     getQuotesFromDB(function(err, quotes) {
		if(err)
			cb(err, quotes);
		else
			cb(err, getElementByIndexElseRandom(quotes, index));
	});
}


module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuotesFromJSON : getQuotesFromJSON,
	getQuoteFromJSON : getQuoteFromJSON,
	seed : seed,
	getQuotesFromDB : getQuotesFromDB,
	getQuoteFromDB : getQuoteFromDB,

}

