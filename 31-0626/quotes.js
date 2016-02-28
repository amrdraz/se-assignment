var db = require("./db.js");
exports.getElementByIndexElseRandom= function(array, index){
	if(index=== undefined){
		var i = Math.floor(Math.random()*(array.length));
		//console.log(array[i]);
		return array[i];
		

	}else{//console.log(array[index]);
		return array[index];
		


	}
};
exports.getQuotesFromJSON = function(){
	var quotes = require("../quotes.json");
	return quotes;	
};
exports.getQuoteFromJSON = function(index){

	var quotes = this.getQuotesFromJSON();
	return this.getElementByIndexElseRandom(quotes,index);

}; 
exports.seed = function(done){
	var quotes = this.getQuotesFromJSON();
	db.db().collection('quotes').count(function(error,count){
		if(!error & count==0){
			db.db().collection('quotes').insert(quotes, function(err, result) {
               
               if(err){
               	done(err, false);
               }else{
               
                done(null,true);}
            });

		}else{
			done(error,false);
		}
	});

	
			
};
exports.getQuotesFromDB= function(done){
	db.db().collection('quotes').find().toArray(function(err,docs){
				
				if(err){
					done(err,null);
				}else{
				
				done(null, docs);
			}
		});
	
};

exports.getQuoteFromDB= function(done, index){
	var quotes =  this.getQuotesFromDB(function(err,docs){
		if(err){
			done(err,null);
		}else{
			var quote=null;
			if(index=== undefined){
		var i = Math.floor(Math.random()*(docs.length));
		
		quote=docs[i];
		}else{
		quote=docs[index];
		}
			done(null,quote);

		}
	});
	
};



