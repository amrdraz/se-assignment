
var r=require("fs");

var db = require('./db.js');
  /*  MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');*/

function getElementByIndexElseRandom(array , index){
	if (index==undefined){
	var rnd0 = Math.floor(Math.random() * array.length);
	return array[rnd0];
}
else{
	return array[index];
}
}

//console.log(getElementByIndexElseRandom([1, 2, 3, 43, 5],0));

function getQuotesFromJSON(){
	var data=JSON.parse(r.readFileSync("../quotes.json"));
	return data;
}


//console.log(getQuotesFromJSON());

function getQuoteFromJSON(index){
	var data=JSON.parse(r.readFileSync("../quotes.json"));
	var rnd1 = Math.floor(Math.random() * 102);
	if (index==undefined){
		return data[rnd1];
	}
	else{
		return data[index];
	}
	
}
//console.log(getQuoteFromJSON(0).author);

function seed(cb){
	
    db.connect(function(err, db){
    var collection=db.collection('quote');
    var arrd=collection.find().toArray(function(err,quotes){
        if (err) 
            return cd(err,false);

        if(quotes.length==0){
           collection.insert(getQuotesFromJSON());
            cb(null,true);
        }
        else{
            cb(null,false);
            console.log("can't insert");
        }
    });
});
    /*var arrd=Db.collection('quote').find().toArray(function(err,quotes){
        if (err) 
            return cd(err,false);

        if(quotes.length==0){
            Db.collection('quote').insert(getQuotesFromJSON);
            cb(null,true);
        }
        else
            cb(null,false);
    });
	*/
	/*if((arrd==null || arrd==[])){
		cd(null,false);

		//db.collection.insert(getQuotesFromJSON());
        db.
	}
	else 
		cd(null,true);*/
/*}catch(err){
	if((arrd==null || arrd==[]))
	cd(err,true);
	else
		cd(err,false);
}*/

}

//seed(function(err,seeded){});



function getQuotesFromDB(cb) {
    // any of quote object in the database  
    db.connect(function(err, db){
    var collection=db.collection('quote');
  collection.find().toArray(function(err, quotes) {
   if (err) return cb(err,null);
  	cb(null, quotes);
    
});
});
}


/*getQuotesFromDB(function(err,quotes){
    console.log(quotes);
});*/

function getQuoteFromDB(cb,index) {
    // any of quote object in the database 
    
   /* getQuotesFromDB(function(err, quotes) {
        if (err) throw err;
        cb(getElementByIndexElseRandom(quotes), index);
    }); */
    db.connect(function(err, db){
    var collection=db.collection('quote');
    if(index==undefined){
    	
    	var rnd = Math.floor(Math.random() * 102);
    	//var myCursor = db.inspire.find( );
    	//var myDocument = myCursor.hasNext() ? myCursor.next() : null;
        
    	collection.find().limit(-1).skip(rnd).toArray(function(err,quote){
    		 if (err) throw err;
            // var q = JSON.parse(quote);
  			 cb(null, quote);
    	});
    }
    else{
    	collection.find().limit(-1).skip(index).toArray(function(err,quote){
    		 if (err) throw err;
             //var q = JSON.parse(quote);
  			 cb(null, quote);
    	});
    }
});
}
    		
    

module.exports = {
    getQuoteFromDB : getQuoteFromDB,
    getQuotesFromDB: getQuotesFromDB,
    seed : seed,
    getQuoteFromJSON : getQuoteFromJSON,
    getQuotesFromJSON : getQuotesFromJSON,
    getElementByIndexElseRandom : getElementByIndexElseRandom
}
/*getQuoteFromDB(function(err,quote){
    console.log(quote);
},0);
*/




