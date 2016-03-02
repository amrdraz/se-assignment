var assert = require('chai').assert;
var expect = require('chai').expect;

var app = require('../app.js').app;
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
        expect(Quote.getElementByIndexElseRandom(arr)).to.be.oneOf(arr);
    });
    it("should return the first element if we also pass the index 0", function() {
        expect(Quote.getElementByIndexElseRandom(arr,0)).to.equal(1);
    });
    it("should return the last element if we also pass the index", function() {
        expect(Quote.getElementByIndexElseRandom(arr,arr.length-1)).to.equal(5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        expect(Quote.getQuotesFromJSON()).to.have.length(102);
        // TODO: you know how many quotes are there
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        expect((Quote.getQuotesFromJSON()[0]).author).to.equal('Kevin Kruse');
        // TODO: you know the content of first quote
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(Quote.getQuoteFromJSON(), 'text');
        assert.property(Quote.getQuoteFromJSON(), 'author');

        // TODO: check that the returned quote has text and author
    });
    it('should return a random quote if index not specified', function() {
        var allQuotes=Quote.getQuotesFromJSON();
        var randQuote=Quote.getQuoteFromJSON();
        assert.include(allQuotes,randQuote,"quore in Array");

       // TODO: is the returned quote in the all quotes array?
    });
    it('should return the first quote if we pass 0', function() {
        expect(Quote.getQuoteFromJSON(0)).to.eql({"author": "Kevin Kruse","text": "Life isn’t about getting and having, it’s about giving and being"});
        // TODO: you know the content of first quote
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {

        Quote.seed(function (err, seeded) {
            assert.isTrue(seeded, 'seeded is true :)');
            done();
        });
        // TODO: assert that seeded is true
    });
    it('should have populated the quotes collection with 102 document', function(done) {

        db.db().collection('quotes').count(function (err,count) {
            expect(count).to.equal(102);
            done();
        });
        // TODO: check that the database contains 102 document
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {

        Quote.seed(function (err, seeded) {
            assert.isNotTrue(seeded, 'seeded is false :)');
            done();
        });
        // TODO: assert that seeded is false
    });
    it('should not seed db again if db is not empty', function(done) {

        db.db().collection('quotes').count(function (err,count) {
            expect(count).to.equal(102);
            done();
        });
        // TODO: The database should have 102 quote still
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

        Quote.getQuotesFromDB(function (err, quotes) {

            expect(quotes).to.have.lengthOf(102);
            done();
     
        });
        // TODO: there should be 102 documents in the db
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {


       Quote.getQuotesFromDB(function (err,quotes){
        Quote.getQuoteFromDB(function (err,quote) {
            assert.include(quotes,quote,"quore in Array");
             done();
        });

       });
        // TODO: see if it returns on of the quotes from all quotes
    });

    it('should return the first quote if passed 0 after callback', function(done) {

        Quote.getQuoteFromDB(function (err, quote) {
            expect(quote.author).to.equal('Kevin Kruse');
            expect(quote.text).to.equal('Life isn’t about getting and having, it’s about giving and being');
            done();
         }, 0);
        // TODO: you know the content of object in the file
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {

       request.get('/hello/mariam').expect(404).end(function (err, res) {
        done();
      });

        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

        request.get('/api/quote').expect('Content-Type', /json/).expect(200).end(function (err, res) {
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("text");
            expect(res.body).to.have.property("author");
            done();
        });

        // TODO: test with supertest
    });

   it('/api/quotes should return an array of JSON object when I visit', function(done) {
        
        request.get('/api/quotes').expect('Content-Type', /json/).expect(200).end(function (err, res) {
            assert.isArray(res.body, 'Finally done :) ');
            done();
        });
        // TODO: test with supertest
    });
});