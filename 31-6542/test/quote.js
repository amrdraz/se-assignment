var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
     db.connect(function(err, db) {
       if (err) return done(err);
        else
         done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() 
    {
        var result = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr, result, "Test passed : Random Element returned");
    });
    it("should return the first element if we also pass the index 0", function() {
        var result = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(result,1, "Test passed : First Element returned");
    });
    it("should return the last element if we also pass the index", function() {
        var result = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(result,5, "Test passed : Last Element returned");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var arr = Quote.getQuotesFromJSON();
        var l = arr.length;
        assert.equal(l,102,"Test passed : an array of 102 returned");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var arr = Quote.getQuotesFromJSON();
        assert.equal(arr[0].author,'Kevin Kruse',"Test passed ");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var q = Quote.getQuoteFromJSON();
        assert.property(q, 'author', 'Test passed ');
        assert.property(q, 'text', 'Test passed ');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var q = Quote.getQuoteFromJSON();
       var arr = Quote.getQuotesFromJSON();
       assert.include(arr, q, "Test passed");
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var q = Quote.getQuoteFromJSON(0);
        assert.equal(q.author,'Kevin Kruse',"Test passed ");
        assert.equal(q.text,'Life isn’t about getting and having, it’s about giving and being',"Test passed ");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) { 
         Quote.seed(function(err,seeded)
         {
             assert.isTrue(seeded, 'Test Passed');
         });
         done();
        // TODO: assert that seeded is true
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err,quotes)
            {
                assert.equal(102,quotes.length, 'Test Passed');
            });
        done();
        // TODO: check that the database contains 102 document

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded)
         {
             assert.isFalse(seeded, 'Test Passed');
         });
         done();
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(err,quotes)
        {
            assert.equal(102,quotes.length, 'Test Passed');
        });
        done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,quotes)
        {
            assert.equal(102,quotes.length, 'Test Passed');
        });

        done();
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        var allQuotes;
        Quote.getQuotesFromDB(function(err,quotes)
        {
            allQuotes=quotes;
        });
        Quote.getQuoteFromDB(function(err,quote)
        {
            assert.include(allQuotes, quote, "Test passed");
        });
        done();
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err,quote)
        {
            assert.equal(quote.author,'Kevin Kruse',"Test passed ");
            assert.equal(quote.text,'Life isn’t about getting and having, it’s about giving and being',"Test passed ");
        },0);
        done();
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/hamada').expect('Content-Type', /json/).expect(404).end(function (err, res) {
      done();
    });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/hamada').expect('Content-Type', /json/).expect(function (err, res) {
            assert.property(res, 'author', 'Test passed ');
            assert.property(res, 'text', 'Test passed ');
            assert.property(res, '_id', 'Test passed '); 
            
        });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get('/hamada').expect('Content-Type', /json/).expect(function (err, res) {
            assert.isArray(res, 'Test passed ');
        });
        done();
    });
});