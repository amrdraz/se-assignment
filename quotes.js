var quotes = require('./quotes.json');
var db = require('./db.js');




 function getElementByIndexElseRandom(array , index){
	if(index==undefined)
	{
		return array[Math.floor(Math.random() * array.length)];
	}
	else {
		return array[index];
	}

}

function getQuotesFromJSON (){
	return quotes;
}

exports.getQuoteFromJSON = function(index){
var array = getQuotesFromJSON ();
	if(arguments.length==0)
	{
		return array[Math.floor(Math.random() * array.length)];

	}
	else {
		return array[index];
	}

}


exports.seed = function (cb){

	var number;
	var data = db.db();
	data.collection('quotes').count(function(err,count)
		{
			if(count==0)
			{
				var dbquotes = getQuotesFromJSON();
				for(i=0;i<dbquotes.length;i++)
				{
					data.collection('quotes').insertOne(dbquotes[i]);
				}
				cb('DB was empty and now populated',true);
			}
			else {

				cb('DB already full',false);


			}
		});;
}

function getQuotesFromDB(cb)
{
	var data = db.db();

	var collection=data.collection('quotes').find();
	var array=[];
	var i=0;
	collection.each(function(err, doc) {

			if (doc != null) {

				 array[i]=doc;
				 i++;



			 }
			  else {
      	cb('no error',array);
      }
   });



}

exports.getQuoteFromDB = function(cb ,index)
{
	getQuotesFromDB(function(err,data){
		if(err=='no error')
		{
			if(index==undefined)
			{

				cb(null,data[Math.floor(Math.random() * data.length)]);

			}
			else {
				cb(null,data[index]);

			}
		}
		else {
			cb(err,null);
		}

	});


}
