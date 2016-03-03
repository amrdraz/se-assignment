var db = require('./db.js');
var quotesjson=require('./quotes.json');





exports.getElementByIndexElseRandom=function (array ,index){
	console.log("Inside getElementByIndexElseRandom");
	if (index===undefined){
		var num=Math.floor(Math.random()*array.length);
		console.log("arguments =1 and"+array[num]);
		return array[num];
	}
	else{
		console.log("arguments =2 and"+array[index]);
		return array[index];
	}
}

exports.getQuotesFromJSON=function (){
	return quotesjson;

}	


exports.getQuoteFromJSON=function (index){
	
	var quotes=[];
	if(arguments.length==1){
		quotes=this.getQuotesFromJSON();
		var theQuote=this.getElementByIndexElseRandom(quotes,index);
		return theQuote;


	}
	else if (arguments.length==0){
		quotes=this.getQuotesFromJSON();
		var theQuote=this.getElementByIndexElseRandom(quotes);
		console.log(theQuote);
		return theQuote;
	}
	else{
		console.log("not the right number of arguments for method getQuoteFromJSON");
		return null;
	}


}



exports.seed = function(cb){
	var quotes = this.getQuotesFromJSON();
		db.db().collection('quotes').count(function(err,count){
				if(count==0){
					db.db().collection('quotes').insert(quotes, function(err, result) {
	               		if(err){
	               			cb(err, false)
	               		}else{
	               
	                		cb("db has been added",true);
	                	}
	            	});
				}else{
					cb("Already full",false);
				}
		});
	
			
};
exports.getQuotesFromDB= function(cb){
	db.db().collection('quotes').find().toArray(function(err,docs){
				if(err){
					cb(err,null);
				}else{
					cb(null, docs);
				}
		});
	
};

exports.getQuoteFromDB= function(cb, index){
	this.getQuotesFromDB(function(err,docs){
		var quote;
		if(err){
			cb(err,null);
		}
		else{
			var quote=null;
			if(index===undefined){
				var num=Math.floor(Math.random()*docs.length);
				quote=docs[num];
				cb(null,quote);
			}
			else{
				quote=docs[index];
				cb(null,quote);
			}	
			

		}
	});
	
};
