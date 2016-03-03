var object = require("./quotes.json")
var Database = require("./db")
var fs = require('fs');





// reads a JSON file, after that it returns a represnetation of it.
var getQuotesFromJSON = module.exports.getQuotesFromJSON = function(){

	return JSON.parse(fs.readFileSync('./quotes.json', 'utf8'));

}

// given an array, and index. It first checks if the index is null, if so it means no choice was done for index so it returns a random entry..
//otherwise it returns the choosen object.
var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom = function(arr, idx){

	if(idx == null)
		return arr[Math.floor(Math.random()*(arr.length))];
	else return arr[idx];
}

// loads all quotes then call getElementByIndexElseRandom
var getQuoteFromJSON = module.exports.getQuoteFromJSON = function(idx)
{
    var all_Quotes = getQuotesFromJSON();

    return getElementByIndexElseRandom(all_Quotes,idx);

}

/**
 First loads all quotes that are avaliable in our database (might be none), and all quotes from our quotes.jason file
 if our database has quotes, or an error occured (err not equal null implies there is one)
 we will callback with the err supplied (if any), and a false, indicating that we did not seed the database. ( We are only looking to seed it if it's not empty.
 ).
 otherwise, let's add in our db, all quotes from our jason file, and call back with true
 implying a seeding occured!
*/
var seed = module.exports.seed = function(cb)
{
    var dd = Database.db();

   var collection = dd.collection('quotes');


 collection.find({}, {}, function(err, docs){



       if(!docs.length){

       collection.insert(getQuotesFromJSON());
        cb(true,'seeded db successfully');
       }
       else{

     cb(false,'db was already seeded');
       }
   });


}

/**

 attempt to load quotes from the database.
 Call back with any errors and the quotes.
 */
var getQuotesFromDB = module.exports.getQuotesFromDB = function(cb)
{
    var collection = Database.db().collection('quotes');
    //FIXED HERE
    // You just need to call toArray after the find since what find() returns is an object not and array
   collection.find().toArray(function(err, docs){
       cb(err,docs);
   });
}


// Call getQuotesFromDB..then getElementByIndex for randomization or by index if needed.
var getQuoteFromDB = module.exports.getQuoteFromDB = function(cb,idx){


	getQuotesFromDB(function(err, quote1){

	   var quote = getElementByIndexElseRandom(quote1,idx);

	   cb(err,quote);
	});

}
