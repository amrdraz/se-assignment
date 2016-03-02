var fs = require('fs');
var db = require('./db.js');
var quotes = require('./quotes.json');

exports.getQuotesFromJSON = function(){
  return quotes;
};


/*exports.getQuotesFromJSON = function(callback){
var obj;
fs.readFile('./quotes.json', 'utf8', function (err, data) {
  if (err) return callback(err);
  obj = JSON.parse(data);  
 // console.log(obj);
  return callback(null, obj);
}
);
};
*/


exports.getElementByIndexElseRandom = function(array, optionalArg){
if (typeof optionalArg === 'undefined') {
    console.log("nope");
    var r = Math.floor(Math.random()*array.length);
    return array[r];
  }else{
    return array[optionalArg]; 
  }        
    
    
};    
exports.getQuoteFromJSON = function(index){
  return exports.getElementByIndexElseRandom(quotes, index);

};
/*
exports.getQuotesFromJSON = function(index){
var obj;
fs.readFile('quotes.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  
});
};*/


/*exports.seed = function(cb){
    for (var i = quotes.length - 1; i >= 0; i--) {
        db.insert(quotes[i], function(err, records){
          if(err){
            console.log("kos ommy");
            return cb(err, false);
          }
          console.log(records);          
        });
        return cb(null, true);
    };
};*/


exports.seed = function(cb){
        var currentRecords = db.getAllQuotes();
        if(currentRecords.length >0){
            return cb(null, false);
        }
        db.insert(quotes, function(err, records){
          if(err){
            return cb(err, false);
          }
          //console.log(records);          
        });
        return cb(null, true);
    };



exports.getQuotesFromDB = function(cb){
   db.db().collection('Cars').find().toArray(function(err, doc) {
          if(doc != null) //console.log("Doc from Each ");
          cb(null, doc);
          
        });
};

exports.getQuoteFromDB = function(cb, index){
    db.db().collection('Cars').find().toArray(function(err, doc) {
          if(doc != null) //console.log("Doc from Each ");
          var result = exports.getElementByIndexElseRandom(doc, index);
          cb(null, result);
          
        });
}

/*
seed(function (err, seeded) {
    // seeded is true when quotes are added to the database
    // seeded is false when nothing is added to the db
})




Quotes.js module should export the following functions

##### `getElementByIndexElseRandom(array [, index])` 

- Given an array returns:
    - A random element from the array If index is not passed.
    - The element in the correct index position if it is.

```js
getElementByIndexElseRandom([1, 3, 4])    // any of 1 3 or 4
getElementByIndexElseRandom([1, 3, 4], 0) // always 1
```


##### `getQuotesFromJSON()`

- returns all the quotes as JSON
    
```js
getQuotesFromJSON() // basically returns the whole object.
```

##### `getQuoteFromJSON(index)`

- returns a random quote from the quotes.json file if index is not passed else the on int the index position.

```js
getQuoteFromJSON()           // any of quote object in the quotes.json file
getQuoteFromJSON(0).author   // Kevin Kruse
```

##### `seed(cb)`

Populate the database with quotes from quotes.json, seed should call the call back when done with an `error, seeded` set of arguments.

seeded is a boolean value that is true if the database was empty (and thus seeded) or no error occurred but the database already contains records.

```js

```


##### `getQuotesFromDB(cb)`

- Will call the callback function passed __cb__ with arguments `error, quotes`
    - error will be null if no error occurred
    - quotes is a list of all quotes
    
```js
getQuotesFromDB(function (err, quotes) {
    // any of quote object in the database  
})
```

##### `getQuoteFromDB(cb [, index])`

- Will call the callback function passed __cb__ with arguments `error, quote`
    - error will be null if no error occurred
    - quote should contain a random quote document returned from the database
- Optional argument index if present will select a specific quote by index from the quotes documents returned.

```js
getQuoteFromDB(function (err, quote) {
    // any of quote object in the database  
})
getQuoteFromDB(function (err, quote) {
    // is Kevin Kruse assuming it's the first document in the database
    quote.author;  
}, 0)
```*/