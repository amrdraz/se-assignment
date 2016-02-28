<<<<<<< HEAD
//importing the quotes JSON file
var quotesList = require('../quotes.json');
//importing db.js to use its function here
var db = require("./db.js")

//the name of the following functions defines themself
=======
var quotesList = require('../quotes.json');
var db = require("./db.js")

>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
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
<<<<<<< HEAD
            collection.insert(quotesList, function(err, res) {
                cb(err, true)
            });
=======
            collection.insert(quotesList, function(err, res) {cb(err, true)})
>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
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


<<<<<<< HEAD
//exporting stuff
=======

>>>>>>> 5ae9d3b5aa6d8da6df309fc15e473dd8684cb91b
exports.getElementByIndexElseRandom=getElementByIndexElseRandom;
exports.getQuotesFromJSON=getQuotesFromJSON;
exports.getQuoteFromJSON=getQuoteFromJSON;
exports.seed=seed;
exports.getQuotesFromDB=getQuotesFromDB;
exports.getQuoteFromDB=getQuoteFromDB;

