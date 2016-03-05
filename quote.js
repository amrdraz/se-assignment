var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var expect = require('chai').expect;
var MongoC = require('mongodb').MongoC;

function elementinArray(arr,value){
for (i = 0; i < arr.length; i++) {
    if(arr[i]==value){
    return true;
    } 
}
return false; 
}

function validquote(){
var temp = Quote.getQuoteFromJSON();
    if (temp.author !== undefined && temp.text!== undefined){
        return true;  
        }
    return false;
       }


before(function(done) {
     db.connect;
    console.log("Connecting")
    done();
    // use this after you have completed the connect function
    // db.connect(function(err, db) {
    //    if (err) return done(err);
    //    else done();
    // });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
assert.equal(elementinArray(arr,Quote.getElementByIndexElseRandom(arr)),true);
     });
    it("should return the first element if we also pass the index 0", function() {
       assert.equal(1,Quote.getElementByIndexElseRandom(arr,0));
    });
    it("should return the last element if we also pass the index", function() {
         assert.equal(5,Quote.getElementByIndexElseRandom(arr,4));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       var t = Quote.getQuotesFromJSON();
        assert.equal(t.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
       var t = Quote.getQuotesFromJSON();
        assert.equal(t[0].author,"Kevin Kruse");

    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
          assert.equal(validquote(),true);
    });
    it('should return a random quote if index not specified', function() {
      var array = Quote.getQuotesFromJSON();
       var t =Quote.getQuoteFromJSON();
        assert.equal(elementinArray(array,t),true);
    });
    it('should return the first quote if we pass 0', function() {
        assert.equal(Quote.getQuoteFromJSON(0).text,"Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function (err, seeded) {
        
        assert.equal(seeded,false); 
         done();
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function (err, quotes) {
            assert.equal(quotes.length,102);
            done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        
        assert.equal(seeded,false);  
         done();
    });
    it('should not seed db again if db is not empty', function(done) {
         Quote.getQuotesFromDB(function (err, quotes) {
            assert.equal(quotes.length,102);
            done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
       Quote.getQuotesFromDB(function (err, quotes) {
            assert.equal(quotes.length,102);
            done();
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
       Quote.getQuotesFromDB(function (err, quotes) {   
      Quote.getQuoteFromDB(function (err, quote)  {

            assert(true,elementinArray(quotes,quote));
            done();      
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function (err, quote) {
        assert.equal(quote.text,"Life isn’t about getting and having, it’s about giving and being")}, 0)
        done();
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
         request.get("/anything").expect(404).end(function(err,res){
       done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get("/api/quote").end(function(err,res){
           expect(res.body).to.have.property("author");
           expect(res.body).to.have.property("text");
           expect(res.body).to.have.property("_id");
           done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
       request.get("/api/quotes").end(function(err,res){
           expect(res.body).to.be.a("array");
           done();
         });
    });
});