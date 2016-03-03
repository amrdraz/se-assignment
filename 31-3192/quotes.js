var json = require('../quotes.json');
var db = require('./db.js');

function getElementByIndexElseRandom(array, index)
{
    if (index == null)
        return array[Math.floor((Math.random())*array.length)];
    else
        return array[index];
}

function getQuotesFromJSON()
{
    return json;
}

function getQuoteFromJSON(index)
{
    return getElementByIndexElseRandom(json, index);
}

function seed(cb)
{

    db.connect(function () {

        db.db().collection('inspire').find().toArray(function (err, entries) {
            if (err)
            {
                cb(1, false); 
            }
            else 
            {
                if (entries.length===0) {db.db().collection('inspire').insertMany(getQuotesFromJSON()); cb(null,true);}
                else {cb(null,false);}
            } 
        });
    });
    
}

function getQuotesFromDB(cb)
{
    
    db.connect(function (){

        db.db().collection('inspire').find().toArray(function (err, entries) {
            
            if (err) { cb(1, null); }
            else { cb(null, entries); }

        })

    });
}

function getQuoteFromDB(cb, index)
{
        db.connect(function (){

        db.db().collection('inspire').find().toArray(function (err, entries) {
            
            if (err) { cb(1, null); }

            else { cb(null,getElementByIndexElseRandom(entries, index)); }

        })

    });

/*    if (index)
        cb(null, db.db().find().skip(index).limit(1));
    else
        cb(null, db.db().find().skip(Math.floor((Math.random())*db.db().count())).limit(1));
*/
}

module.exports = {
  getElementByIndexElseRandom:getElementByIndexElseRandom,
  seed:seed,
  getQuoteFromDB:getQuoteFromDB,
  getQuotesFromDB:getQuotesFromDB,
  getQuoteFromJSON:getQuoteFromJSON,
  getQuotesFromJSON:getQuotesFromJSON
}