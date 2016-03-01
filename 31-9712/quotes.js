//importing the quotes JSON file
var quotesList = require('../quotes.json');
//importing db.js to use its function here
var db = require("./db.js")

//the name of the following functions defines themself
function getElementByIndexElseRandom (array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
}
function getQuotesFromJSON (){
   return quotesList;
}

function getQuoteFromJSON (index){
    return getElementByIndexElseRandom(quotesList,index);
}

function seed(cb) {
    var collection = db.db().collection("quotes")
    collection.count(function(err, c) {
        if(err)
            cb(err, c)
        else if(c === 0){
            collection.insert(quotesList, function(err, res) {
                cb(err, true)
            });
        }else{
            cb(err, false)
        }
    })
}



function getQuotesFromDB(cb) {
    db.db().collection("quotes").find({}).toArray(function(err, quotes) {
        if(err)
            cb(err, quotes)
        else
            cb(err, quotes)
    })
}

function getQuoteFromDB(cb, index) {
    getQuotesFromDB(function(err, quotes) {
        if(err)
            cb(err, null)
        else
            cb(err, getElementByIndexElseRandom(quotes, index))
    })
}


//exporting stuff
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;
