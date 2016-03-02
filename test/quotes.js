// tests/quotes.js

var assert = require('chai').assert;
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db');

before(function(done) {
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();

     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        var bool = false;
        var item = Quote.getElementByIndexElseRandom(arr);
        for (var i = arr.length - 1; i >= 0; i--) {
            if(arr[i] === item){
                bool = true;
            }
        };
        assert.equal(bool, true);
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var e = Quote.getElementByIndexElseRandom(arr, 0);
        assert.equal(Quote.getElementByIndexElseRandom(arr, 0), arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        assert.equal(Quote.getElementByIndexElseRandom(arr, arr.length-1), arr[arr.length-1]);

    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var q = Quote.getQuotesFromJSON();
        assert.equal(q.length, 102);
        
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var a = Quote.getQuotesFromJSON();
        assert.equal(a[0].author, "Kevin Kruse");
        

    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var a = Quote.getQuoteFromJSON(0);
        assert.property(a, "author");
        assert.property(a, "text");
    });
    it('should return a random quote if index not specified', function() {
    
       // TODO: is the returned quote in the all quotes array?
        var a = Quote.getQuoteFromJSON();
        var b = Quote.getQuotesFromJSON();
        var flag = false;
        for (var i = b.length - 1; i >= 0; i--) {
            if(b[i] == a){
                flag = true;
            }
        };
        assert.equal(flag, true);
       
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var a = Quote.getQuoteFromJSON(0);
        assert.equal(a.author, "Kevin Kruse");


    
    });
});

// quotes collection should be called quotes
describe('seed', function(done) {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err, seeded){
            assert(seeded, true);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err, seeded){
            assert(seeded, false);
            done();
        });
         });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded){
            assert(seeded, false);
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
       Quote.seed(function(err, seeded){
            assert(seeded, false);
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, data){
            if(err) throw err;
            assert(data.length, 102, "There are " + data.length + " records");
            done();
        })
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function(err, data){
            if(err) throw err;
            var a = Quote.getQuotesFromJSON();
/*
            var flag = false;
        for (var i = a.length - 1; i >= 0; i--) {
            if(a[i] == data){
                flag = true;
            }
        };*/
        assert.include(a, data);
        done();
        });

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB( function(err, data){
            if(err) throw err;
/*
            var flag = false;
        for (var i = a.length - 1; i >= 0; i--) {
            if(a[i] == data){
                flag = true;
            }
        };*/
        assert.equal(data.author, "John Lennon");
        done();
        }, 0);

    });
});

/*describe('API', function() {
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
});*/