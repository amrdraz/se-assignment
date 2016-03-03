
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

function found(arr,element)
{
    for(var i = 0 ; i < arr.length; i++)
    {
        if(arr[i] === element) return true;
    }
    return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
       var  ele = Quote.getElementByIndexElseRandom(arr);
       
       assert.equal(found(arr,ele),true);
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var ele = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(ele,arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
        var ele = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(ele,arr[4]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var ele = Quote.getQuotesFromJSON();
        assert.equal(ele.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var q = Quote.getQuotesFromJSON();
        var fst = q[0];
        assert.equal(fst.author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var q = Quote.getQuoteFromJSON();
        console.log(q);
        var bool = (q.author != undefined) && (q.title !=undefined);
        assert.equal(bool,true);
    });
    it('should return a random quote if index not specified', function() {
       
       var allqs = Quote.getQuoteFROMJSON();
       var me = Quote.getQuoteFromJSON();
       assert.equal(true,found(allqs,me));
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var qs = Quote.getQuotesFromJSON();
        var me = qs[0];
        assert.equal(Quote.getQuoteFromJSON(0),me);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
    });
});