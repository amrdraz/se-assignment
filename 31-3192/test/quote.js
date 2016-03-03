// tests/quote.js

var assert  = require('chai').assert;
var app     = require('../app.js');
var request = require('supertest');
var Quote   = require('../quotes.js');
var db      = require('../db.js');
// var someVar = require('mocha');

before(function(done) {
     
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr, Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert(Quote.getElementByIndexElseRandom(arr, 0) == 1);
    });
    it("should return the last element if we also pass the index", function() {
        assert(Quote.getElementByIndexElseRandom(arr, arr.length-1) == 5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert(Quote.getQuotesFromJSON().length == 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert(Quote.getQuotesFromJSON()[0].author == "Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert(Quote.getQuoteFromJSON().author && Quote.getQuoteFromJSON().text);
    });
    it('should return a random quote if index not specified', function() {
       assert.include(Quote.getQuotesFromJSON(), Quote.getQuoteFromJSON());
    });
    it('should return the first quote if we pass 0', function() {
        assert("Life isn’t about getting and having, it’s about giving and being", Quote.getQuoteFromJSON(0).text);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) { 
        Quote.seed(function (err, mahBool) {
        	assert(mahBool);
        	done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function (err, entries){
        	assert(entries.length==102);	
        	done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function (err, mahBool) {
        	assert(!mahBool);
        	done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.getQuotesFromDB(function (err, entries){
        	assert(entries.length==102);	
        	done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function (err, entries){
        	assert(entries.length==102);	
        	done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function (err, entry){
        	Quote.getQuotesFromDB(function (err2, entries){
        		assert.include(entries, entry);	
        	    done();
        	});
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function (err, entry){
        	Quote.getQuotesFromDB(function (err2, entries){
        		assert(entry.text == entries[0].text && entry.author == entries[0].author);	
        	    done();
        	});
        }, 0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/IDontActuallyExist').expect(404,done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').expect('Content-Type', /json/).expect(200, function (err, res) {
        	if (res.body.author && res.body._id && res.body.text)
        		done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes').expect('Content-Type', /json/).expect(200, function(err, res){
        	if (Array.isArray(res.body))
        		done();
        });
    });
});