var assert   = require('chai').assert;
var app      = require('../app.js');
var request  = require('supertest');
var Quote    = require('../quotes.js');
var db       = require('../db.js');
var expect   = require('chai').expect;


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
        var output = getElementByIndexElseRandom(arr);
        expect(arr).to.include(output);
    });
    it("should return the first element if we also pass the index 0", function() {
        var output = getElementByIndexElseRandom(arr,0);
        expect(output).to.equal('1');
    });
    it("should return the last element if we also pass the index", function() {
        var output = getElementByIndexElseRandom(arr,1);
        expect(output).to.equal('2');
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var array= getQuotesFromJSON();
        expect(array).to.have.length('102');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var array  = getQuotesFromJSON();
        var author = array.author ;
        expect(author).to.equal('Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote = getQuoteFromJSON();
        expect(quote).to.only.have.keys('author', 'text');

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quote = getQuoteFromJSON(null);
       expect('quottes.JSON').to.contain('quote');
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quote = getQuoteFromJSON(0);
        expect(quote.text).to.equal('Life isn’t about getting and having, it’s about giving and being');

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        seed(function(reply){
            expect(reply.seeded).to.equal('true');
            done();
        });

    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        seed();
        expect(DB.Collections("quotes").count()).to.equal('102');
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
        var quotes = getQuotesFromDB();
        expect(quotes).to.have.length(102);
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
