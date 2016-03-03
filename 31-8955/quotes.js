var jsonFile = require('../quotes.json');
var quotesDB = require('./db.js')


var getElementByIndexElseRandom  = function getElementByIndexElseRandom(array , index) 
{
   index = index === undefined ? Math.floor(Math.random() * array.length) : index;
   return array[index];
}

var getQuotesFromJSON = function getQuotesFromJSON() 
{
   return jsonFile ;
}

			
exports.getQuoteFromJSON = function getQuoteFromJSON(index) 
{
   return getElementByIndexElseRandom( getQuotesFromJSON() , index) ;
} 

exports.seed = function seed(cb) 
{
   var theDB = quotesDB.db();
   theDB.collection('theQuotesDB').find().count( function( err , theCount){
   	if( theCount === 0 )
   	{
   		 theDB.collection('theQuotesDB').insertMany( jsonFile , function(err2 , inserted){
		    if( !err2 && inserted ) 
		    {
		       cb( err2 , true);
		    }
		    else
		    {
		       cb( err2 , inserted); //check 
		    }
   	
         } ) ;
   	}

   	else
   	{
   		cb(err,false);
   	}

   })
   
   
}

var getQuotesFromDB = function getQuotesFromDB(cb) 
{
   quotesDB.db().collection('theQuotesDB').find().toArray( function(err,quotes){
   	cb(err,quotes);
   } ) ;
}

exports.getQuoteFromDB = function getQuoteFromDB(cb , index) 
{
   getQuotesFromDB( function (err , quotes){
       cb(err , getElementByIndexElseRandom(quotes , index));
   });
}

exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
exports.getQuotesFromJSON = getQuotesFromJSON ;
exports.getQuotesFromDB = getQuotesFromDB ;