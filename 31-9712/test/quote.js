var assert = require('chai').assert;
var expect = require("chai").expect
var app = require('../app.js');
var request = require('supertest');
var server = request.agent("http://localhost:3000");
var Quote = require('../quotes.js');
var db = require('../db.js');
var q = require('../quotes.json');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(db) {
        done();
    });
});


describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
      var res=  Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(res)>-1,"tThe element "+res+" is in the array");
    });
    it("should return the first element if we also pass the index 0", function() {
      var res =  Quote.getElementByIndexElseRandom(arr,0);
        assert(res===arr[0],"It should return the first element");
    });
    it("should return the last element if we also pass the index", function() {
    var res =  Quote.getElementByIndexElseRandom(arr,arr.length-1);
        assert(res===arr[arr.length-1],"It should return the last element")
    });
});

describe("getQuotesFromJSON", function() {
    var quotes = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        assert(quotes.length == 102, "Expected quotes length of 102, found "+quotes.length);
    });
    it("first quote in the array's author should be مزاجنجي", function() {
        assert(quotes[0].author == 'مزاجنجي', "Expected first quote's author to be Kevin Kruse, found " + quotes[0].author);
    });
});
describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var res = Quote.getQuoteFromJSON(0);
        assert.isObject(res,"res is Object !!");
        assert.property(res,"author");
        assert.property(res,"text");
    });
    it('should return a random quote if index not specified', function() {
        assert.include(Quote.getQuotesFromJSON(), Quote.getQuoteFromJSON());
    });
    it('should return the first quote if we pass 0', function() {
        var res = Quote.getQuoteFromJSON(0);
        var all= Quote.getQuotesFromJSON();
        assert(res===all[0],"It should return first quote");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded) {
            assert.equal(null, err);
            assert.equal(seeded, true);
            done();
        })
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection("quotes").count(function(err, c) {
            assert.equal(null, err);
            assert.equal(102, c);
            done()
        })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, seeded) {
            assert.equal(null, err);
            assert.equal(seeded, false);
            done()
        })
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection("quotes").count(function(err, c) {
            assert.equal(null, err);
            assert.equal(102, c);
            done()
        })
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes) {
            assert.equal(null, err);
            assert(quotes.length===102,"All quotes loaded successfully");
            done();
        })
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err, qs) {
            assert.equal(null, err);
            Quote.getQuoteFromDB(function(err, q) {
                assert.include(qs, q);
                assert.equal(null, err);
                done();
            })
        })

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err, qs) {
            assert.equal(null, err);
            Quote.getQuoteFromDB(function(err, q) {
                assert(qs[0].text=== q.text);
                assert.equal(null, err);
                done();
            },0)
        })
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        server.get('/someWrongAddress').expect(404).end(function(err,res){
            done();
        })
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        server.get('/api/quote').expect(200).end(function(err,res){
            assert.equal(null, err)
            assert.property(res.body, "author");
            assert.property(res.body, "text");
            assert.property(res.body, "_id");
            done();
        })
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        server.get('/api/quote').expect(200).end(function(err,res){
            assert.equal(null, err);
            done();
        })
    });
});