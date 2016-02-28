var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var jsonn= require('../../quotes.json');

function doesContain(arr,i){
  for(var idx=0;idx<arr.length;idx++){
    if(arr[idx]===i)return true;
  }
  return false;
}

before(function(done) {
     // use this after you have completed the connect function
      db.connect(function(DB) {
        done();
      });
 });

describe("getElementByIndexElseRandom", function() {
    
    it("should return a random element that is included in the array if no index is provided", function() {
      var temp = Quote.getElementByIndexElseRandom(jsonn);
      assert.equal(doesContain(jsonn,temp),true);
    });
    it("name of the author of first quote", function() {
      assert.equal(Quote.getElementByIndexElseRandom(jsonn,0).author,"Kevin Kruse");
    });
    it("should return text of the last quote", function() {
      assert.equal(Quote.getElementByIndexElseRandom(jsonn,101).text,"If you can dream it, you can achieve it");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
      assert.equal(Quote.getQuotesFromJSON().length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      var jsonFile = Quote.getQuotesFromJSON();
      assert.equal(jsonFile[0].author,"Kevin Kruse");
        // TODO: you know the content of first quote
    });
});

 describe("getQuoteFromJSON", function() {
     it('should return a quote object with an author and text property', function() {
       var returnedQuote = Quote.getQuoteFromJSON();
       if(returnedQuote.author!== undefined && returnedQuote.text!==undefined){
         assert.equal(true,true);
       }else{
         assert.equal(true,false);
       }
     });
     it('should return a random quote if index not specified', function() {
        var temp = Quote.getQuoteFromJSON();
        assert.equal(doesContain(Quote.getQuotesFromJSON(),temp),true);
     });
     it('should return the second quote if we pass 0', function() {
       assert.equal(Quote.getQuotesFromJSON()[1],Quote.getQuoteFromJSON(1));
     });
 });

 // quotes collection should be called quotes
 describe('seed', function() {
     before(db.clearDB);

     //console.log(db.db().collection('quotes').count());
     it('should populate the db if db is empty returning true', function(done) {
         Quote.seed(function(error, seeded){
             assert(seeded,true);
             done();
         });

     });
     it('database count should be 102 ', function(done) {
         Quote.getQuotesFromDB(function(error, quotes){
             assert(quotes.length === 102,true);
             done();
         });

     });
     it('should not seed db again if db is not empty returning false in the callback', function() {
         Quote.seed(function(error, seeded){
             assert(seeded,false);
             done();
        });
     });

   });

 describe('getQuotesFromDB', function() {
     it('should return all quote documents in the database', function(done) {
       Quote.getQuotesFromDB(function(err, quotes){
           assert(quotes.length === 102,true);
           done();
       });
     });
 });

 describe('getQuoteFromDB', function() {
     it('should return a random quote document', function(done) {
       Quote.getQuoteFromDB(function(err,quote){
         Quote.getQuotesFromDB(function(err,quotes){
           assert(true,doesContain(quotes,quote));
           done();
         });
       });
     });
     it('should return the first quote if passed 0 after callback', function(done) {
       Quote.getQuoteFromDB(function(err,quote){
         var myQuote = Quote.getQuotesFromJSON()[0];
         assert(true,myQuote===quote);
         done();
       },0);
     });
});
 describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
     request.get("/about").set("Accept","text/html").expect(404).end(function(err,res){
       done();
     });
    });
    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
      request.get("/api/quote").set("Accept", "application/json").expect(200).end(function(err,res){
           expect(res.body).to.have.property("author");
           expect(res.body).to.have.property("text");
           expect(res.body).to.have.property("_id");
           done();
         });
      });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
      request.get("/api/quotes").set("Accept", "application/json").expect(200).end(function(err,res){
           expect(res.body).to.be.a('array');
           done();
      });
    });
 });
