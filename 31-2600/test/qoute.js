var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    
     db.connect(function(err, db) {
        if (err) return done(err);
        else done();
});
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
      var random= Quote.getElementByIndexElseRandom(myArray);
      assert(myArray.indexOf(random)==1);
    });
    it("should return the first element if we also pass the index 0", function() {
        var first= Quote.getElementByIndexElseRandom(myArray,0);
        assert(first==myArray[0]);
    });
    it("should return the last element if we also pass the index", function() {
        var second=Quote.getElementByIndexElseRandom(myArray,myArray-1);
        assert(second==[myArray-1]);
    });
});
describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
       
        assert(  Quote.getQuotesFromJSON().length==102,"Array has 102 qoute"+Quote.getQuotesFromJSON().length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
       assert(q[0].author=='Kevin Kruse',"first qoute in the array shpuld be author kevin kruse"+q[0].author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(q.getQuoteFromJSON(),"author");
        assert.property(q.getQuoteFromJSON(),"text");
    });
    it('should return a random quote if index not specified', function() {
       assert(q.getQuotesFromJSON().indexOf(q.getQuoteFromJSON()!=-1));
    });
    it('should return the first quote if we pass 0', function() {
        assert.equal(Quote.getQuotesFromJSON()[0].author,Quote.getQuoteFromJSON(0).author);
        assert.equal(Quote.getQuotesFromJSON()[0].text,Quote.getQuoteFromJSON(0).text);

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
       Quote.seed(function(err,seeded){
             assert(seeded==true);
         });
           done();
       
      });
});
         
    
    it('should have populated the quotes collection with 102 document', function(done) {
       Quote.getQuotesFromDB(function(error,quote){
            assert(Quote.length==102,"Number of qoutes"+Quote.length);
            done();
        });
    
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        //
       describe("getQuotesFromJSON", function() {
           
    it("should return an array of 102 quote", function() {
         assert.equal(Quote.getQuotesFromJSON(),102);
        
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuotesFromJSON()[0].author,'Kevin Kruse');
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
       
if(Quote.getQuoteFromJSON().author == author && Quote.getQuoteFromJSON().text==qoute){
  assert.equal(true,true);
    }else{
     assert.equal(true,false);
}
    });
    it('should return a random quote if index not specified', function() {
    
      assert.equal(doesContain(Quote.getQuotesFromJSON(),Quote.getQuoteFromJSON()),true);
 });
    it('should return the first quote if we pass 0', function() {
        assert.equal(Quote.getQuoteFromJSON()[0],Quote.getQuotesFromJSON(0));
    });


// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
         Quote.seed(function(error, seeded){
         assert(seeded,true);
          done();
    });
    it('should have populated the quotes collection with 102 document', function(done) {
       
    //
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        //
         it('/api/quotes should return an array of JSON object when I visit', function(done) {
    var quotes = JSON.parse(response.text);
 assert.equal(Array.myArray(quotes), true);
 done();
});
});

});