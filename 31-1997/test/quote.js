// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var quotesJSON = require('../quotes.json');
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

        if (arr.length <= 1)
            assert.isOk(true, "Array contains 0 or 1 elements");
        else {
            var firstVal = Quote.getElementByIndexElseRandom(arr);
            assert.include(arr, firstVal, "quotes.json contains the returned quote");

            //Random idea for checking for randomness :")
            var same = true;
            for (i = 0; i < 30; i++)
                if (Quote.getElementByIndexElseRandom(arr) !== firstVal) {
                    same = false;
                    break;
                }
            assert.notEqual(true, same, "Distinct values generated");
        }
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(arr[0], Quote.getElementByIndexElseRandom(arr, 0), "Fetched first element correctly");
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(arr[arr.length - 1], Quote.getElementByIndexElseRandom(arr, arr.length - 1), "Fetched last element correctly");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of " + quotesJSON.length + " quotes", function() {
        var quotes = Quote.getQuotesFromJSON();
        assert.lengthOf(quotes, quotesJSON.length, "Returned " + quotesJSON.length + " elements");
    });
    it("first quote in the array's author should be " + quotesJSON[0].author, function() {
        // TODO: you know the content of first quote
        assert.equal(quotesJSON[0].author, Quote.getQuotesFromJSON()[0].author, "Correct first author name");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var quote = Quote.getQuoteFromJSON();
        assert.property(quote, 'author');
        assert.property(quote, 'text');
    });

    it('should return a random quote if index not specified', function() {

        var firstVal = Quote.getQuoteFromJSON();
        assert.include(quotesJSON, firstVal, "quotes.json contains the returned quote");

        if (quotesJSON.length < 2)
            assert.isOk(true, "Array contains 0 or 1 elements");
        else {
            //Checking for randomness
            var same = true;
            for (i = 0; i < 30; i++)
                if (Quote.getQuoteFromJSON() !== firstVal) {
                    same = false;
                    break;
                }
            assert.notEqual(true, same, "Distinct values generated");
        }
    });

    it('should return the first quote if we pass 0', function() {
        assert.equal(quotesJSON[0], Quote.getQuoteFromJSON(0), "Correct first author name");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded) {
            assert.equal(true, seeded, "First Seeding Successful");
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(err, quotes) {
            assert.lengthOf(quotes, quotesJSON.length, "DB contains " + quotesJSON.length + " quotes");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded) {
            assert.equal(false, seeded, "Already Seeded");
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(err, quotes) {
            assert.lengthOf(quotes, quotesJSON.length, "DB contains " + quotesJSON.length + " quotes");
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes) {
            assert.lengthOf(quotes, quotesJSON.length, "DB contains " + quotesJSON.length + " quotes");
            done();
        });
    });
});


describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes

        Quote.getQuotesFromDB(function(err, quotes) {

            Quote.getQuoteFromDB(function(err, quote) {
                assert.include(quotes, quote, "quotes db contains the returned quote");
                done();
            });
        });

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file

        Quote.getQuotesFromDB(function(err, quotes) {

            Quote.getQuoteFromDB(function(err, quote) {
                assert.deepEqual(quotes[0], quote, "returned first quote");
                done();
            }, 0);
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get("/lolo")
            .expect(404)
            .end(function(err, res) {
                assert.equal(404, res.status, "Error 404 url doesn't exist");
                done();
            });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get("/api/quote")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(200, res.status, "200 SUCCESS");
                assert.isObject(res.body, "is a JSON object brens wllahy");
                assert.property(res.body, '_id');
                assert.property(res.body, 'text');
                assert.property(res.body, 'author');
                done();
            });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get("/api/quotes")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(200, res.status, "200 SUCCESS");
                assert.isArray(res.body, "is a JSON object brens wllahy");
                done();
            });
    });
});
