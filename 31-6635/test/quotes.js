
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
  
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert(Quote.getElementByIndexElseRandom(arr)!=-1);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),'1');
    });
    it("should return the last element if we also pass the index 4", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,4),'5');
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quotes", function() {
        var array = Quote.getQuotesFromJSON();
        assert.equal(array.length,'102');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var array = Quote.getQuotesFromJSON();
        assert.equal(array[0].author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
         assert.property(Quote.getQuoteFromJSON(), "author");
         assert.property(Quote.getQuoteFromJSON(), "text"); 
    });
    it('should return a random quote if index not specified', function() {
       var allquotes=Quote.getQuotesFromJSON();
       assert(allquotes.indexOf(Quote.getQuoteFromJSON())!=-1);
    });
    it('should return the first quote if we pass 0', function() {
         assert.equal('Kevin Kruse'.author,Quote.getQuoteFromJSON(0).author);
         assert.equal('Life isn’t about getting and having, it’s about giving and being',Quote.getQuoteFromJSON(0).text);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
         Quote.seed(function(err,seeded)
        {

           assert.equal(seeded,true);    
         });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection("inspire").count(function(err, count)
        {
           assert.equal(count,'102');
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err,seeded)
        {

           assert.equal(seeded,false);    
         });
    });
    it('should not seed db again if db is not empty', function(done) {
         db.db().collection("inspire").count(function(err, count)
        {
           assert.equal(count,'102');
        });
    });

});