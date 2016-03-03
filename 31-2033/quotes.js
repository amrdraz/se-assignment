var quotesss = require(',quotes.json');
var db= require('./db.js');

getElementByIndexElseRandom(array [, index]){
	
		if(index==null){
			var i=Math.floor(Math.random() * array.length);
            return array[i];
			}
			else {return array[index];
			}
	};
 seed(function(err.seeded){
 	db.db().insert(quotesss,function(err,success){
 		if(err == null){
 			fuction(err,true)
 		}else{
 			throw err;
 		}
 		var counting = db.db().count();
 		if (var == 0){
 			db.db().insert(quotesss,function(err,success){
 				if(err != null)
 					throw err;
 				else{function(err,true);}
 			});
 		}
 		else {
 			function(err,false);
 		}
 	});

 };

getQuotesFromDB(cb){
	var c = db.collection('Quotesss').find();
	c.each(function(err,doc){
		assert.equal(err,null);
		if(doc== null){
			cb(err,Quotesss)
		}else{
			console.dir(doc);
		}
	});
}}
getQuoteFromDB(cb[,index]){};
};

getQuotesFromJSON(){
	require('.quotes.json');
}
getQuotesFromJSON(index){
	if(index == null){
		var j = Math.floor(Math.random()*10);
		return getElementByIndexElseRandom(quotesss,j);
	}
	else
{
	return getElementByIndexElseRandom(quotesss,index);
}};
