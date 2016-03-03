// establishing connection to database

var databaseConnection = require('./db');
var db = databaseConnection.db();
var fs = require('fs');


var getElementByIndexElseRandom = module.exports.getElementByIndexElseRandom =  function (array , index) {
  if(typeof index == "undefined")
  index = Math.floor(Math.random() * array.length);

  return array[index];
};


var getQuotesFromJSON = module.exports.getQuotesFromJSON = function () {
  var fs = require('fs');
  var quotes = fs.readFileSync('../quotes.json', 'utf8');

  return JSON.parse(quotes);
};

var getQuoteFromJSON = module.exports.getQuoteFromJSON =function (index) {
  return getElementByIndexElseRandom(getQuotesFromJSON(), index);
};




var seed = module.exports.seed =  function seed( cb ){

var collection = db.get('quotes');

var quotes = getQuotesFromJSON();



collection.find({} , {} , function(err,res){

	var error = '' ;
	var seeded = false;

	if(err == null){


		if(res.length == 0 ){
		for(var i = 0 ; i<quotes.length ; i++){
	collection.insert(quotes[i]);


}
seeded = true;
	}else{
		error = "quotes have been inserted before";
		}

	}else{

		error = err;
	}
	cb(error,seeded);
});


}



var getQuotesFromDB = module.exports.getQuotesFromDB = function  (cb){
	var collection = db.get('quotes');

	collection.find({},{},function(err,res){
      var quotes = [];
      var error;
      if(err==null){
      if (res.length > 0)
      	{
      	 quotes = res ;
      	 error = null;

      	}else{
      	seed(function (err1, seeded) {
            error = err;
      	});
      	}

      }else{
      	error = err;
      }
     cb(error , quotes);

	});

}

var getQuoteFromDB = module.exports.getQuoteFromDB =   function  (cb , index){
   var collection = db.get('quotesCollection');

   getQuotesFromDB(function(err,quotes){
    var quote = getElementByIndexElseRandom(quotes,index);

    cb(err,quote);
   });

}
