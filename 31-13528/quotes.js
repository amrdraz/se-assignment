var express=require('express');
var router=express.Router();
var fs=require('fs');
var db=require("./db.js");
var q=require("./quotes.js");




exports.getElementByIndexElseRandom=function (array ,index){
 index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
}

exports.getQuotesFromJSON=function getQuotesFromJSON (){
var text = fs.readFileSync('/home/abdullah/quotes.json','utf8');
return JSON.parse(text);
}

//dont forget get quote from json
exports.getQuoteFromJSON= function getQuoteFromJSON(index){
    var arr=q.getQuotesFromJSON();
    var quote=q.getElementByIndexElseRandom(arr,index);
    return quote;

}

exports.getQuotesFromDB=function (callback){
	 db.db().collection('quotes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            callback(err,items);
            //return items;
        });
    });
}
// dont forget get quote from db
exports.getQuoteFromDB=function(callback,index){
	q.getQuotesFromDB(function(err,items){
     callback(err,q.getElementByIndexElseRandom(items,index));
   });
}

//dont forget seed 

exports.seed=function (callback) {
    
    	var collection=db.db().collection("quotes");
		collection.count(function (err,count){
			if(count==0){
				var data=q.getQuotesFromJSON();
    	collection.insertMany( q.getQuotesFromJSON()
       , function(err, result) {
       callback(err,true);
        });
    
			}
			else  callback(err,false);

		});
    	
    
}
   
