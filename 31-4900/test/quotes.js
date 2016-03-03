// tests/quotes.js

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

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var index = arr.indexOf(Quote.getElementByIndexElseRandom(arr));
        assert.notEqual(index, -1);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr, 0), 1);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr, 4), 5);
    });
});

describe("getQuotesFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();

    it("should return an array of 102 quote", function() {
        var length = quotes.length;
        assert.equal(length , 102,"tested");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var author = quotes[0].author;
        assert.equal(author , "Kevin Kruse","tested");
    });
});

describe("getQuoteFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();
    var quote = Quote.getQuoteFromJSON();    
    it('should return a quote object with an author and text property', function() {
        assert.property(quote , 'author' , "tested");
        assert.property(quote , 'text' , "tested");
    });
    it('should return a random quote if index not specified', function() {
        assert.include(quotes , quote , "tested");
    });
    it('should return the first quote if we pass 0', function() {
        var knownFirstQuote = quotes[0];
        var unknownFirstQuote = Quote.getQuoteFromJSON(0);
        assert.equal(knownFirstQuote , unknownFirstQuote , "tested");
   });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
       Quote.seed(function(err , seeded){
            assert.isTrue(seeded , "tested");
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
         Quote.getQuotesFromDB(function(err , quotesdocs){
            assert.equal(quotesdocs.length , 102 , "tested");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
          Quote.seed(function(err , seeded){
            assert.isNotTrue(seeded , "tested");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
          Quote.getQuotesFromDB(function(err , quotesdocs){
            assert.equal(quotesdocs.length , 102 , "tested");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quotes documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotesdocs){
            assert.equal(quotesdocs.length, 102,"tested");
            done(err);
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
        request.get('/notValidUrl').expect(404, done);
    });

    it("should return a 200 for the root page", function(done) {
        request.get('/').expect(200, done);
    });

    it("should return a 200 for the root page with /index", function(done) {
        request.get('/index').expect(200, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').expect('Content-Type', /json/)
        .expect(function(res){
            if(!('_id' in res.body && 'text' in res.body && 'author' in res.body))
                throw new Error("Missing keys");
        }).expect(200, done);

    });

    it('/api/quotes should return an array of JSON objects when I visit', function(done) {
        request.get('/api/quotes').expect('Content-Type', /json/)
        .expect(function(res){
           if(!Array.isArray(res.body))
                throw new Error("Returned object is not an array");
            for(var i = 0; i < res.body.length; ++i)
                if(typeof res.body[i] !== 'object')
                    throw new Error("Some contents of the array are not JSON objects");
        })
        .expect(200, done);
    });
});