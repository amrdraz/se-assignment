
var fs      =require('fs');
var mongo   = require('mongodb');
var db = require('./db.js');



exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array ,index){

	if(index === undefined) {
		return array[Math.floor(Math.random()*array.length)];           //done :)
	}
	else{
		return array[index];
	}

};

exports.getQuotesFromJSON=function getQuotesFromJSON(){
	var quotes = fs.readFileSync("quotes.json");                        //done :)
    return JSON.parse(quotes);
};


exports.getQuoteFromJSON=function getQuoteFromJSON(index){
       var jsonQuotes=JSON.parse(fs.readFileSync("quotes.json"));
       if(index === undefined){

         	return jsonQuotes[Math.floor(Math.random()*jsonQuotes.length)];    //done :)
            
       }
       else{

            return jsonQuotes[index];
       }
	
};

//function (err,seeded)
 
exports.seed=function seed(cb){
  
  db.db().collection('quotes').count(function(err,count){
  	if(!err && count===0){
  		db.db().collection('quotes').insert(JSON.parse(fs.readFileSync("quotes.json")),function(err,inserted){
  			cb(err,true);
  		});
  	}
  	else{
  		cb(err,false);
  	}
  });
};



exports.getQuotesFromDB = function getQuotesFromDB(cb){
	
	db.db().collection('quotes').find().toArray(function(err,quotes){
		cb(err,quotes);
	});
};



exports.getQuoteFromDB = function getQuoteFromDB(cb,index){

    exports.getQuotesFromDB(function(err,quotes){
       var quote = exports.getElementByIndexElseRandom(quotes,index);
       cb(err, quote);
    });
    

};







