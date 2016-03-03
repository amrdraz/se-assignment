var dbreq = require('./db');

function getElementByIndexElseRandom(array , index) {
if(typeof index == "undefined") {
var num = Math.floor(Math.random() * array.length);
return array[num];  
}
else {
	return array[index];
   }
}


//console.log(getElementByIndexElseRandom([1,2,3,4]));
//console.log(getQuoteFromJSON());getQuotesFromDB(function(err,data){


function getQuotesFromJSON() {
	var fs = require('fs');
	var r = fs.readFileSync('../quotes.json');

	return JSON.parse(r);
}
function getQuoteFromJSON(index) {
	var array = getQuotesFromJSON();
if(typeof index == "undefined") {
var num = Math.floor(Math.random() * array.length);
return array[num];  
}
else {
	return array[index];
   }

}
function seed(cb) {
// var db = dbreq.db();
dbreq.connect(function(db){

db.collection("q").count(function (err, count) {
	if (!err && count === 0) {
        db.collection("q").insert(getQuotesFromJSON());
        cb(err,true);
    }
    else {
    	cb(err,false);
    }
});

});


}


function getQuotesFromDB(cb) {

dbreq.connect(function(db){
db.collection("q").find({}, {}, function(err, data){

       data.toArray(function(arr,docs) {
     cb(err,docs); 
   })
}); 

});

	// cb(err, getQuotesFromJSON());
}
function getQuoteFromDB(cb, index) {

dbreq.connect(function(db){
  db.collection("q").find({}, {}, function(err, data){
   
   data.toArray(function(arr,docs) {
     var quote = getElementByIndexElseRandom(docs,index);
     cb(err,quote); 
   })

   
  }); 

});
}


exports.getQuoteFromDB = getQuoteFromDB;
exports.seed = seed;
exports.getQuotesFromDB = getQuotesFromDB;