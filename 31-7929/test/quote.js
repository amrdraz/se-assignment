// tests/quotes.js

var assert = require('chai').assert;
var expect = require('chai').expect;    
var app = require('../app.js');
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
    it("should return a random element that is included in the array if we omit the index", function(done) {
        // TODO  
        var x = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr ,x );
        done();
    });
    it("should return the first element if we also pass the index 0", function(done) {
        // TODO 
        //Quote.getElementByIndexElseRandom(arr,0);
        var x = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(x , arr[0]);
        done();

    });
    
    it("should return the last element if we also pass the index", function(done) {
        // TODO
        //Quote.getElementByIndexElseRandom(arr,arr.length-1)
        var x  = Quote.getElementByIndexElseRandom(arr,arr.length-1);
        assert.equal(x,arr[arr.length-1]);
        done();

    });
});

describe("getQuotesFromJSON", function() {
        var x = Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function(done) {
        // TODO: you know how many quotes are there
        assert.lengthOf(x,102);
        done();
    });
    it("first quote in the array's author should be Kevin Kruse", function(done) {
        // TODO: you know the content of first quote
        assert.equal(x[0].author , "Kevin Kruse");
        done();
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function(done) {
        // TODO: check that the returned quote has text and author
        var s  = Quote.getQuoteFromJSON();
        assert(s.text   != "undefined");
        assert(s.author != "undefined");
        done();
    });
   it('should return a random quote if index not specified', function(done) {
       // TODO: is the returned quote in the all quotes array?
       var all = Quote.getQuotesFromJSON();
       var one = Quote.getQuoteFromJSON();
       assert.include(all ,one);
       done();
    });
    it('should return the first quote if we pass 0', function(done) {
        // TODO: you know the content of first quote
        assert.equal(Quote.getQuoteFromJSON(0).text,"Life isn’t about getting and having, it’s about giving and being");
        done();
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err , seeded){
             assert.equal(seeded , true);
            done();
         });
    });
    
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(err,data){
            assert.lengthOf(data,102);
        })
        done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err , seeded){
             assert.equal(seeded , false);
         });
         done();
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
         Quote.getQuotesFromDB(function(err,data){
            assert.lengthOf(data,102);
        })
        done();
    });

});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,data){
            assert.lengthOf(data,102);
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
     Quote.getQuotesFromDB(function(err,data1){
        Quote.getQuoteFromDB(function(err,data2){
            assert.include(data1, data2);

        });   
        });
        done();

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err,data){
            assert.equal(data.text,"Life isn’t about getting and having, it’s about giving and being");
            assert.equal(data.author ,"Kevin Kruse");
        },0);
            done();
    });
});


describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/cfhx').expect(404);
        done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        var quote = request.get('/api/quote').expect('Content-Type', 'application/json');
        assert(quote._id != "undefined");
        assert(quote.text != "undefined");
        assert(quote.author != "undefined");
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        var quo = request.get('/api/quotes',function(req,res){
                 expect(res).to.be.instanceof(Array);
            
        }).expect('Content-Type', 'application/json');
        done();
    //     Quote.getQuotesFromDB(function(err,data){

    //     done();
        
    // });

    });
});