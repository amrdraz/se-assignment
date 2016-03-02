

var db= require("./db.js");
var getElementByIndexElseRandom=function (array ,index)
{
	if(index==null)
{	
	var size= array.length;
	var x= Math.floor(Math.random() *size);
	return array[x];
}
else 
return array[index];
}


//console.log(getElementByIndexElseRandom([1,3,4,7]));
//console.log(getElementByIndexElseRandom([1,3,4],0));



var getQuotesFromJSON=function()
{
	return require('../quotes.json');
}

var getQuoteFromJSON= function(index)
{
	//var toarray=JSON.stringify(quotes);
	//toarray1=JSON.parse(toarray);	
	return getElementByIndexElseRandom(getQuotesFromJSON(),index);	 

}

var quotes= getQuotesFromJSON();
console.log(getQuoteFromJSON(0));
console.log(getQuoteFromJSON(0).author);


var seed= function(cb)
{	
	var quotes= getQuotesFromJSON();
	var collection=db.db().collection("quotes");
	collection.count(function(err,seeded)
	{
		if(err)
			cb(err,false);
	
	if(seeded==0)
	{
		//console.log(seeded + " henaa");
		collection.insert(quotes,function(err,seeded)
			{
				cb(err,true);
				//console.log("ADDED!");
			});
		
	}
	else
		
	{
		//console.log("ERROR!");
		cb(err,false);
	}
	});
}


var getQuotesFromDB=function(cb)
{
	var quotes= getQuotesFromJSON();
		db.db().collection("quotes").find({}).toArray(function(err,quotes)
		{
			cb(err,quotes);
		});
	}

var getQuoteFromDB= function(cb , index)
{
	getQuotesFromDB(function(err,quotes)
	{

		cb(err,getElementByIndexElseRandom(quotes,index));
	}
		);
}



exports.getElementByIndexElseRandom= getElementByIndexElseRandom;
exports.getQuotesFromJSON= getQuotesFromJSON;
exports.getQuoteFromJSON= getQuoteFromJSON;
exports.getQuotesFromDB= getQuotesFromDB;
exports.getQuoteFromDB= getQuoteFromDB;
exports.seed= seed;

