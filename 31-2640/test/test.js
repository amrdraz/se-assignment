var assert = require('chai').assert;
var expect = require('chai').expect; 
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    //use this after you have completed the connect function
    db.connect(function(db) {
       done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
     var value = Quote.getElementByIndexElseRandom(arr);
     assert.include(arr,value,"");
        // TODO
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
    var value = Quote.getElementByIndexElseRandom(arr,0);
     assert.equal(arr[0],value,"");
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
    var value = Quote.getElementByIndexElseRandom(arr,(arr.length-1));
      
     assert.equal(arr[(arr.length-1)],value,"");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var x = Quote.getQuotesFromJSON();
        assert.lengthOf(x,102,"it return array of 102 quotes");
        // TODO: you know how many quotes are there
    });

    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var x = Quote.getQuoteFromJSON(0);
        assert.equal(x.author,"Kevin Kruse","first author is Kevin Kruse");


    });
});

describe("getQuoteFromJSON", function() {
     var x = Quote.getQuoteFromJSON();
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
       
         expect(x).to.have.property("author");
         expect(x).to.have.property("text");


    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       assert.include(Quote.getQuotesFromJSON(),x,"");
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var f = Quote.getQuotesFromJSON()[0];
        var s = Quote.getQuoteFromJSON(0);
        assert.equal(f,s,"return the first quote if we pass 0");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    var se =Quote.seed
    it('should populate the db if db is empty returning true', function(done) {
      se(function (err, seed){
        assert.isTrue(seed, 'db is empty');
        done();

     })   });


    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
            Quote.getQuotesFromDB(function(error , docs){
               // var x =  Quote.getQuotesFromJSON();
                assert.lengthOf(docs,102,"contain 102 document");
  		done();
            })
           
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        se(function (err, seed){
        assert.isNotTrue(seed, 'db is empty');
        done();

     }) 


    });


    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(error , docs){
                assert.lengthOf(docs,102,"contain 102 document");
         		done();
            })
            

    })
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(error , docs){
                assert.lengthOf(docs,102,"contain 102 document");
		 done();
            })
            
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function(error ,quote){
               var x =  Quote.getQuotesFromJSON();
                assert.include(x,quote,"contain random quote");
   	done();
            })
          
    });
    it('should return the first quote if passed 0 after callback', function(done) {
     //   TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(error,quote){
            assert.equal(quote.author,"Kevin Kruse","first author is Kevin Kruse");
            assert.equal(quote.text,"Life isn’t about getting and having, it’s about giving and being","my text");
		done();

        },0)
        
    });
});
describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
      request.get("/notdefined").set("Accept", "text/html").expect(404).end(function(err,res){
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
