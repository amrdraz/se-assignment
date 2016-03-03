var quotes = require('../quotes.json');
var db = require('./db.js');




 var getElementByIndexElseRandom = function (array , index){
	if(index==undefined)
	{
		return array[Math.floor(Math.random() * array.length)];
	}
	else {
		return array[index];
	}

}

var getQuotesFromJSON = function (){
	return quotes;
}

var getQuoteFromJSON = function(index){

  return getElementByIndexElseRandom(getQuotesFromJSON(),index);

}


var seed = function (cb){

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

var getQuotesFromDB =function(cb)
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

var getQuoteFromDB = function(cb ,index)
{
	getQuotesFromDB(function(err,data){
		if(err=='no error')
		{

      cb(null, getElementByIndexElseRandom(data,index));

		}
		else {
			cb(err,null);
		}

	});


}

module.exports = {
  getElementByIndexElseRandom: getElementByIndexElseRandom,
  getQuoteFromJSON: getQuoteFromJSON,
  getQuotesFromJSON: getQuotesFromJSON,
  seed: seed,
  getQuoteFromDB: getQuoteFromDB,
  getQuotesFromDB: getQuotesFromDB

}
