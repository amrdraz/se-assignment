// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
        done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert(arr.indexOf(Quote.getElementByIndexElseRandom(arr)) > -1 );
    });
    it("should return the first element if we also pass the index 0", function() {
       assert(arr.indexOf(Quote.getElementByIndexElseRandom(arr,0)) == 0 );
    });
    it("should return the last element if we also pass the index", function() {
       assert(arr.indexOf(Quote.getElementByIndexElseRandom(arr,arr.length-1)) == arr.length-1 );
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert(Quote.getQuotesFromJSON().length == 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert (Quote.getQuotesFromJSON()[0].author ==='Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(Quote.getQuoteFromJSON(),'author');
        assert.property(Quote.getQuoteFromJSON(),'text');
    });
    it('should return a random quote if index not specified', function() {
        assert(Quote.getQuotesFromJSON().indexOf(Quote.getQuoteFromJSON()) > -1);
    });
    it('should return the first quote if we pass 0', function() {
        assert(Quote.getQuotesFromJSON().indexOf(Quote.getQuoteFromJSON(0)) == 0);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function (err , seeded){
            assert(seeded);
        });
        done();

    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').find().count( function (err , count){
            if(count == 102)
                assert(true);
            else 
                assert(false);
        });
        done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function (err , seeded){
            assert(!seeded);
            
        });
        done();
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection('quotes').find().count( function (err , count){
            if(count == 102)
                assert(true);
            else 
                assert(false);
        });
        done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function (err , quotes){
            assert(quotes.length == 102);
        })
        
        done();
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err , quotes){
            Quote.getQuoteFromDB(function (err , quote){
               assert(quotes.indexOf(quote) > -1);
            });
        })
        done();
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err , quotes){
            Quote.getQuoteFromDB( 0, function (err , quote){
               assert(quotes.indexOf(quote) == 0);
            });
        })
        done();
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('habal')
        .expect(404)
        .end(function(err, res){
            done();
  });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
     request.get('/api/quote').expect(200).end(function(err,res)
        {
            assert.property(res.body, "author");
            assert.property(res.body, "text");
            assert.property(res.body, "_id");
            done();
        });

    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get("/api/quotes").expect(200).expect("Content-Type", /json/).end(done());     
    });
});