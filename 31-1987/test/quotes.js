var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    //use this after you have completed the connect function
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var element = Quote.getElementByIndexElseRandom(arr);
        assert.include(arr, element,"Not in array");
    });
    it("should return the first element if we also pass the index 0", function() {
        var element = Quote.getElementByIndexElseRandom(arr,0);
        assert((arr[0] == element),"Returns wrong element");
    });
    it("should return the last element if we also pass the index", function() {
        var element = Quote.getElementByIndexElseRandom(arr,4);
        assert((arr[4] == element),"Returns wrong element");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
      assert((Quote.getQuotesFromJSON().length == 102),"Doesn't have 102 Quotes");
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      assert((Quote.getQuotesFromJSON()[0].author == "Kevin Kruse"),"Returns wrong quote");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert((Quote.getQuoteFromJSON().author != null)&&(Quote.getQuoteFromJSON().text != null),"Doesn't have text and author");
    });
    it('should return a random quote if index not specified', function() {
        assert.include(Quote.getQuotesFromJSON(), Quote.getQuoteFromJSON() ,"Not in array");
    });
    it('should return the first quote if we pass 0', function() {
        assert((Quote.getQuoteFromJSON(0).author == "Kevin Kruse")
        &&(Quote.getQuoteFromJSON(0).text == "Life isn’t about getting and having, it’s about giving and being"),
        "Returns wrong quote");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err,seeded){
          done();
         assert((seeded==true),"Doesn't return true when the database is filled");

        });

     });
    it('should have populated the quotes collection with 102 document', function(done) {
      Quote.getQuotesFromDB(function(err,array)
      {
        done();
        assert(array.length == 102,"Doesn't have 102 Quotes");

      });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
      Quote.seed(function(err,seeded){
        done();
        assert((seeded==false),"Returned true although database is already full");

        });


    });
    it('should not seed db again if db is not empty', function(done) {

        Quote.seed(function(err,seeded){
          Quote.getQuotesFromDB(function(err,array)
          {
            done();
            assert((array.length == 102)&&(seeded==false),"Database doesn't contain 102 quotes or seeded is true");

          });
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

        Quote.getQuotesFromDB(function(err,array)
        {
          done();
          assert(array.length == 102,"Doesn't have 102 Quotes");


        });

    });
});



describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,quotes)
      {
          Quote.getQuoteFromDB(function(err1,quote)
          {
            done();
            assert.include(quotes, quote,"Doesn't return a quote from the database");
          });
      });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
      Quote.getQuotesFromDB(function(err,quotes)
    {
        Quote.getQuoteFromDB(function(err1,quote)
        {
          done();
          assert((quote.author == "Kevin Kruse")
          &&(quote.text == "Life isn’t about getting and having, it’s about giving and being"),
          "Returns wrong quote");
        },0);
    });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/nullpage').expect(404).end(function(err,res)
      {
        done();
      });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
      request.get('/api/quote')
     .expect('Content-Type', /json/)
     .end(function(err, result){
         var quote = result.body;
         assert.isObject(quote, 'body is an object');
         assert.property(quote, '_id');
         assert.property(quote, 'author');
         assert.property(quote, 'text');
         done();
     });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
      request.get('/api/quotes')
      .end(function(err, result){
          var quotes = result.body;
          assert.isArray(quotes, 'It is not an object of type array');
          assert.isObject(quotes[0],"Array Of Objects");
          done();

      });
    });
});
