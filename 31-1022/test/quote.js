// tests/quotes.js

var assert = require('chai').assert;
var expect=require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
    //    if (err) return done(err);
    done();
});
    // });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        var elem= Quote.getElementByIndexElseRandom(arr);
       assert(arr.indexOf(elem)>-1,"element is not in the array");
        
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var elem= Quote.getElementByIndexElseRandom(arr,0);
        assert(elem===1, "not the first element");
         
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        var s=arr.length-1;
        var elem= Quote.getElementByIndexElseRandom(arr,s);
        assert(elem===5, "not the last element");

    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var quotes= Quote.getQuotesFromJSON();
        var quotesLength= quotes.length;
        assert(quotesLength===102,"getQuoteFromJSON doesn't return all quotes");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var quotes= Quote.getQuotesFromJSON();
        var firstQuote= quotes[0];
        var firstAuthor= firstQuote.author;
        assert(firstAuthor==='Kevin Kruse', "'The first quote is not written by Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote= Quote.getQuoteFromJSON();
        assert(quote.text !== undefined && quote.author !== undefined, "The object is not a quote");

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quotes= Quote.getQuotesFromJSON();
       var quote= Quote.getQuoteFromJSON();
       assert(quotes.indexOf(quote)>-1,"quote is not in the array");

    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
       var quote= Quote.getQuoteFromJSON(0);
       assert((quote.text==="Life isn’t about getting and having, it’s about giving and being") && (quote.author === "Kevin Kruse"),"this quote is not the first one");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded)
            {
                assert(seeded===true,"The db was empty and now it is populated.")
            });
        done();

    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err,seeeded)
            {
                 assert(db.db().collection('quotes').count()===102,"db not populated with 102 quotes");
            });
       done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded)
            {
                assert(seeded===false,"db already full")
            });
            done();

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err,seeeded)
            {
                 assert(db.db().collection('quotes').count()===102,"db not populated with 102 quotes");
            });
       done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        var quotes= Quote.getQuotesFromDB(function(err,quotes)
            {
                var quotesLength= quotes.length;
                assert(quotesLength===102,"getQuoteFromDB doesn't return all quotes");
               
            });
        done();

        
    });

});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        var quotes= Quote.getQuotesFromJSON();
        var quote= Quote.getQuoteFromDB(function(err,quote)
            {
                assert(quotes.indexOf(quote)>-1,"quote is not in the db");

            });

       done();
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        
        var quotes= Quote.getQuotesFromJSON();
        var quote= Quote.getQuoteFromDB(function(err,quote){
            assert((quote.text==quotes[0].text) && (quote.author == quotes[0].author),"this quote is not the first one in db");
          
        }, 0);
        done();  
        
    });
});

describe('API', function() {
    request = request(app);
    var supertest= require("supertest");
    var server = supertest.agent("http://localhost:3000");
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
            server
            .get("/random")
            .expect(404)
            .end(function(err,res){
        //res.status.should.equal(404);
      
    });
            done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        var quotes= Quote.getQuotesFromJSON();

        server
        .get("/api/quote")
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){
          assert("_id" in res.body && "author" in res.body && "text"in res.body, "keys not in JSON object");
            
            });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
      
        server
        .get("/api/quotes")
        .expect("Content-type",/json/)
        .expect(200) 
        .end(function(err,res){ 
            assert(Array.isArray(res.body)==true,"doesn't return array of quotes");
        });
        done();
    });
});