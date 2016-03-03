
var DB=require('./db.js');
var fs=require('fs');
/*db.connect(function function_name (err, conn) {
	seed(function (err, seeded){
		if(err){
			console.log(err);
		}
		else {
			console.log(seeded);
		}
	})
});*/


function getElementByIndexElseRandom (array,index){
	if(index===undefined)
		return array[Math.floor(Math.random()*array.length)];
	else
		return array[index];

}
function getQuotesFromJSON(){
var contents = fs.readFileSync('quotes.json');
 var jsonContent = JSON.parse(contents);
 //console.log("get quotes"+jsonContent);
 return jsonContent;
 

}

function getQuoteFromJSON(index) {
	var response=getQuotesFromJSON();
  if(index===undefined)
  	return response[Math.floor(Math.random() * response.length)];
  else{
  	
  	return response[index];
  }
  	
}
function seed(cb) {
	// console.log(db.db());
	DB.db().collection('quotes').count(function  (err, length) {
		console.log(length);
		if (err) return cb(err);
		if(length>0){
			//DB.clear();
			//console.log(length);
			cb(null, false)		
		} else {
			DB.db().collection('quotes').insert(getQuotesFromJSON(), function (err, response) {
				console.log("in seed"+DB.db().collection('quotes').find());
				cb(err, true);
			});
		}

	});
}

 function getQuotesFromDB(cb){
   DB.db().collection('quotes').find().toArray(function (err,quotes) {
 	if (err)
     cb(err);
   else{
      cb(null,quotes); 
   }
 });
}


function getQuoteFromDB(cb, index){
	getQuotesFromDB(function(err,quotes){
    cb(err,getElementByIndexElseRandom (quotes,index)); 
  });
   

}


exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.getQuotesFromJSON = getQuotesFromJSON;
exports.getQuoteFromDB=getQuoteFromDB;
exports.getQuotesFromDB=getQuotesFromDB;
exports.seed = seed;
//console.log(getElementByIndexElseRandom([1, 3, 4])) ;   // any of 1 3 or 4
//console.log(getElementByIndexElseRandom([1, 3, 4], 0));
// console.log("getDB:"+getQuotesFromDB());
//console.log(getQuoteFromJSON()) ;          // any of quote object in the quotes.json file
//console.log(getQuoteFromJSON(0).author);
