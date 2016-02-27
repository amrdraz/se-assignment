var quotesList = require('../quotes.json');
var db = require("./db.js")

function getElementByIndexElseRandom (array, index) {
    index = index === undefined ? Math.floor(Math.random() * array.length) : index;
    return array[index];
}
function getQuotesFromJSON (){
    fetch('./quotes.json').then(function(res) {
        return res.json();
    })
}

function getQuoteFromJSON (index){
    fetch('./quotes.json').then(function(res) {
        if(index==undefined){
            index=  Math.floor(Math.random() * res.length)
        }
        return res.json[index];
    })
}

function seed(cb) {
    var collection = db.db().collection("quotes")
    collection.count(function(err, c) {
        if(err)
            cb(err, c)
        else if(c === 0){
            collection.insert(quotesList, function(err, res) {cb(err, true)})
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



exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;

