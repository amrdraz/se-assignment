var dbJS =require("./db.js");
var db = null;

dbJS.connect(function(err, database) {
	dbJS.clearDB();
	if(err) throw Error('Error Connecting to DB');
	else 
		{	console.log("connected to db");
			db = database;
			seed(function(err,seeded)
			{
				if(err) throw Error("DB not initialized");
				if(seeded)
					console.log("Added To DB");
				else
					console.log("Already Added to DB");
			});
		}
});

function getElementByIndexElseRandom(s, index){
	if(index ===undefined )
		return s[Math.floor(Math.random()*s.length)];

	return s[index];
}

function getQuotesFromJSON(){
	var JSON= require('../quotes.json');
	return JSON;
}
function getQuoteFromJSON(index){

	var wholeFile=getQuotesFromJSON();
	var quote=getElementByIndexElseRandom(wholeFile,index);
}
function seed(cb) {
	var seeded=false;
    if(db==null)
    	return cb(true,false);

    else{if(db.collection('quotes').count()>0)
    	//seeded= false;
    cb(null,false);

    else {
    
    	var wholeFile=getQuotesFromJSON();
    	db.collection('quotes').insertMany(wholeFile);
    	//seeded=true;
    	cb(null,true);
    	}}
   // cb(null,seeded);
}

function getQuotesFromDB(cb){
	if(db ===null)
		return cb(true,null);
    var quotes = db.collection('quotes').find().toArray(cb);
	//cb(null,quotes);
}

function getQuoteFromDB(cb){
	getQuotesFromDB(function(err , quotes){
		var quote = getElementByIndexElseRandom(quotes);
		cb(false,quote);
	})
}

module.exports = {
	getElementByIndexElseRandom : getElementByIndexElseRandom,
	getQuoteFromDB : getQuoteFromDB,
	getQuotesFromDB: getQuotesFromDB,
	getQuotesFromJSON: getQuotesFromJSON,
	getQuoteFromJSON: getQuoteFromJSON,
	seed: seed
}
//wholeFile.forEach(function(quote){
    		//db.collection('quotes').insert(quote);