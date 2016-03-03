//var JSON = require('./package.json');
var getElementByIndexElseRandom = fuction getElementByIndexElseRandom(array [, index]){
	if (index===undefined){
		var randomValue = myArray[Math.floor(Math.random() * myArray.length)];
        var element = array[randomvalue];
	}
	else {
		var element = array[index];
	}
}

var getQuotesFromJSON = function getQuotesFromJSON(){
	return require('../quotes.json');
}

var getQuoteFromJSON = function getQuoteFromJSON([index]){
     if(index==undefined){
     	var random = myArray[Math.floor(Math.random() * myArray.length)];
     	quotes.json[random];
     }
}

var seed = function seed(cb){
	DB.db().collection('quotes').insertMany(getQuoteFromJSON());
	assert.equal(null,err);
	assert.equal(1,result.result.n);
	cb(err);
	}
}

var getQuotesFromDB = function getQuotesFromDB(cb){

}

var getQuoteFromDB = function getQuoteFromDB(cb [, index])