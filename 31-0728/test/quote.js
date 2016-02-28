// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

/*before(function(done) {

     db.connect(function(db) {
        done();
     });
});*/

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var random = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr , random , "Done..");
    });
    it("should return the first element if we also pass the index 0", function() {
        var first = Quote.getElementByIndexElseRandom(arr , 0);
        assert.equal(first , arr[0] , "Done..");
    });
    it("should return the last element if we also pass the index", function() {
        var last = Quote.getElementByIndexElseRandom(arr , 4);
        assert.equal(last , arr[4] , "Done..");

    });
});

describe("getQuotesFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();

    it("should return an array of 102 quote", function() {
        var length = quotes.length;
        assert.equal(length , 102 , "Done..");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var author = quotes[0].author;
        assert.equal(author , "Kevin Kruse" , "Done..");
    });
});

describe("getQuoteFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();
    var quote = Quote.getQuoteFromJSON();    
    it('should return a quote object with an author and text property', function() {
        assert.property(quote , 'author' , "Done..");
        assert.property(quote , 'text' , "Done..");
    });
    it('should return a random quote if index not specified', function() {
        assert.include(quotes , quote , "Done..");
    });
    it('should return the first quote if we pass 0', function() {
        var knownFirstQuote = quotes[0];
        var unknownFirstQuote = Quote.getQuoteFromJSON(0);
        assert.equal(knownFirstQuote , unknownFirstQuote , "Done..");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err , seeded){
            assert.isTrue(seeded , "Done..");
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
         Quote.getQuotesFromDB(function(err , docs){
            assert.equal(docs.length , 102 , "Done..");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
          Quote.seed(function(err , seeded){
            assert.isNotTrue(seeded , "Done..");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
          Quote.getQuotesFromDB(function(err , docs){
            assert.equal(docs.length , 102 , "Done..");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err , docs){
            assert.equal(docs.length , 102 , "Done..");
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err , docs){
            Quote.getQuoteFromDB(function(err , doc){
                assert.include(docs , doc , "Done..");
                done();
            });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err , docs){
            Quote.getQuoteFromDB(function(err , doc){
                var text1 = docs[0].text;
                var text2 = doc.text;
                var author1 = docs[0].author;
                var author2 = doc.author;
                assert.equal(text1 , text2 , "Done..");
                assert.equal(author1 , author2 , "Done..");
                done();
            } , 0);
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/mora').expect(404,done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote')
        .expect('Content-Type', /json/)
        .end(function(err, result){
            var quote = result.body;
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes')
        .end(function(err, result){
            var quotes = result.body;
            assert.isArray(quotes, 'Done..');
            var quote = quotes[0];
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });
});