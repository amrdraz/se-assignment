var  allQuotes= require('./quotes.json');
var db = require('./db.js');



exports.getQuotesFromJSON =function getQuotesFromJSON(){
  return allQuotes;
};

exports.getQuoteFromJSON =function getQuoteFromJSON(index){
  index = index === undefined ? Math.floor(Math.random() * allQuotes.length) : index;
  return allQuotes[index];
};



 exports.getQuotesFromDB = function getQuotesFromDB(cb){
 db.db().collection('quotes').find({}).toArray(function(err, quotes){
    cb(err, quotes);
 });
}

exports.getQuoteFromDB = function getQuoteFromDB(cb,index){
  db.db().collection('quotes').find({}).toArray(function(err, quotes){
    index = index === undefined ? Math.floor(Math.random() * quotes.length) : index;
    var quote = quotes[index];
    cb(err, quote);
  });
};


/*
exports.getQuotesFromDB = function getQuotesFromDB(cb){
  db.db().collection('quotes').find({}).toArray(function(err, quotes){
    cb(err, quotes);
  });
};

exports.getQuoteFromDB = function getQuoteFromDB(cb,index){
  db.db().collection('quotes').find({}).toArray(function(err, Allquotes){
    
    if(index === undefined)
    {
      index =  Math.floor(Math.random() * Allquotes.length);
      return Allquotes[index];
    }
    else
    {
      return Allquotes[index];
    }
   
    cb(err, Allquotes[index]);
  

  });
};
*/
exports.seed = function seed(cb) { 
	//inserting the data in my collection to get tham back in the Database
  db.db().collection('quotes').count(function (err, cnt) {
      if (!err && cnt === 0) {
        db.db().collection('quotes').insert(allQuotes, function (err, insertComplete) {
          cb(err,true);
          console.log("Database Created, refresh the server, buddy ! :D ")
        });
      }else {
      
        cb(err, false);
        	console.log("Mabydkholsh hena y3am, khalas")
      }
  });
};
exports.getElementByIndexElseRandom = function getElementByIndexElseRandom(array, index) {
   if(index===undefined)
   {
   index =  Math.floor(Math.random() * array.length) 
   return array[index];
   }
else
{
  return array[index];
}
    
};



