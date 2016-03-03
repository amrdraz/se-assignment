var getElementByIndexElseRandom= function (array,index) {
	if( index){
		
		return  array[index]
	}else{
		
			
		return array[Math.floor(Math.random()*array.length)]
		
	}
}
var getQuotesFromJSON=function(){
	var quotes = require('./quotes.json')
	
	return quotes
}
var getQuoteFromJSON = function(index){
	var quotes = require('./quotes.json')
	if( index){
		
		return  quotes[index]
	}else{
		
			
		return quotes[Math.floor(Math.random()*quotes.length)]
		
	}
}
var seed=(function (err, seeded) {
    var db = require('./db.js')
    db.connect();
    db.db();
    db.clear();
    db.quotes.insertMany(getQuotesFromJSON());
    if(!err){
    	return seeded;
    }else{
    	return err;
    }
})
console.log(seed());

