


var getElementByIndexElseRandom = function (array , index){

	if(index===undefined){


	var random = myArray[Math.floor(Math.random() * myArray.length)];

	var misha=array[random];
	}
	else{

	var misha=array[index];

	}
	return misha;
}



var getQuotesFromJSON = function (){
	
	return require('../quotes.json');

};


var getQuoteFromJSON= function g([index]){
	if(index===undefined){
var random = myArray[Math.floor(Math.random() * myArray.length)];
quotes.json[random];


}

var seed = function (cb){
	 DB.db().collection('quotes').insertMany(getQuotesFromJSON(), function(err, result) {
	    assert.equal(null, err);
	    assert.equal(1, result.result.n);
	    cb(err);
	});
}


var getQuotesFromDB =function (cb){





}