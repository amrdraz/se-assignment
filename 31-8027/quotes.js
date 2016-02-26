
var r=require("fs");

var Db = require('db').connect;
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

function seed(cd){
	var arrd=Db.getCollectionNames();
	if (err) 
    	return cd(err,false);
	if((arrd==null || arrd==[])){
		cd(null,false);
		db.collection.insert(getQuotesFromJSON());
	}
	else 
		cd(null,true);
/*}catch(err){
	if((arrd==null || arrd==[]))
	cd(err,true);
	else
		cd(err,false);
}*/

}

console.log(seed(function()));



function getQuotesFromDB(cb) {
    // any of quote object in the database  
   db.collection('quote').find().toArray(function(err, quotes) {
   if (err) return cb(err);
  	cb(null, quotes);
})
}


function getQuoteFromDB(cd,index) {
    // any of quote object in the database 
   
    if(index==undefined){
    	
    	var rnd = Math.floor(Math.random() * array.length);
    	//var myCursor = db.inspire.find( );
    	//var myDocument = myCursor.hasNext() ? myCursor.next() : null;
    	db.collection('quote').find().limit(-1).skip(rnd).toArray(function(err,quote){
    		 if (err) return cb(err);
  			cb(null, quote);
    	});
    }
    else{
    	db.collection('quote').find().limit(-1).skip(index).toArray(function(err,quote){
    		 if (err) return cb(err);
  			cb(null, quote);
    	});
    }
    /*		);
    	}
    	cd(null,randomElement);
    }
    catch(err){
		cd(err,null);
}
} else{
	try{
    	var element=db.inspire.find().limit(1).skip(index);
    	cd(null,element);
    }
    catch(err){
    	cd(err,null);
    }
    }*/

}





