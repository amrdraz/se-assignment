var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var meth = require('../static/js/quotes.js');
var db = require('../static/js/db.js');
var supertest = require("supertest");
var api = supertest ("http://localhost:3000");
var should = require('chai').should();
var assert = require('chai').assert;
var expect = require('chai').expect;
var include = require('chai').include;
var parsedJSON = require('../static/quotes.json');

before(function(done) {
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
             var res= meth.getElementByIndexElseRandom(arr);
     expect(arr).to.include(res);
    });
    it("should return the first element if we also pass the index 0", function() {
        var res= meth.getElementByIndexElseRandom(arr,0)
         res.should.equal(1);
    });
    it("should return the last element if we also pass the index", function() {
       var res= meth.getElementByIndexElseRandom(arr,arr.length-1)
       res.should.equal(5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var res = meth.getQuotesFromJSON();
       res.should.have.lengthOf(102);
    });

    it("first quote in the array's author should be Kevin Kruse", function() {
        var res = meth.getQuotesFromJSON();
        var first = res[0].author;
        first.should.equal("Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var res = meth.getQuoteFromJSON();
        res.should.have.property('text');
        res.should.have.property('author');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var res = meth.getQuoteFromJSON();
       expect(parsedJSON).to.include(res);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var res = meth.getQuoteFromJSON(0);
        var text= res.text;
        text.should.equal("Life isn’t about getting and having, it’s about giving and being");

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        meth.seed(function (err, seeded){
        assert.isTrue(seeded);
         done();
    }); 
    });

    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        meth.seed (function (){
           db.db().collection("quotes").count(function (err, length){
            length.should.equal(102);
              done();
           });
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
          meth.seed(function (err, seeded){
        assert.isFalse(seeded);
         done();
    }); 

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
          meth.seed (function (){
           db.db().collection("quotes").count(function (err, length){
            length.should.equal(102);
              done();
           });
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
     meth.getQuotesFromDB( function (err, quotes){
        quotes.should.have.lengthOf(102);
        done();
     });

    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
       
        meth.getQuoteFromDB( function (err, quote){
          expect(parsedJSON).to.include(quote);
            done();
        });
    });

    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        meth.getQuoteFromDB( function (err, quote){
            var res = meth.getQuoteFromJSON(0).text;
            var wanted= quote.text;
            wanted.should.equal(res);
        done();

        }, 0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/nothing')
        .expect(404)
        .end(function (err, res){
           res.status.should.equal(404);
           done();
        })
   
       });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
          request.get('/api/quote')
        .expect(200)
        .end(function (err, res){
            res.body.should.have.property('_id') && res.body.should.have.property('text') && res.body.should.have.property('author');
           res.status.should.equal(200);
           done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
            request.get('/api/quotes')
        .expect(200)
        .end(function (err, res){
            if (res.body instanceof Array)
                assert.isTrue(true);
            else 
                assert.isTrue(false);
           done();
        });

    });
});