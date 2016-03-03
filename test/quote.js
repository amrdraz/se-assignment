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
        var x = Quote.getElementByIndexElseRandom(arr);
        var flag = false;
        for(var i = 0; i < arr.length; i++) {

          if(x === arr[i]) {
            flag = true;
          }
        }

        assert.equal(flag,true);

    });
    it("should return the first element if we also pass the index 0", function() {
      var x = Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(x,arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
      var x = Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(x,arr[4]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {

      var test = Quote.getQuotesFromJSON();
      assert.equal(test.length,102);

    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      var test = Quote.getQuotesFromJSON();
      var authorTest = test[0].author;
      assert.equal(authorTest,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {

      var quoteTest = Quote.getQuoteFromJSON();
      var booleanCheck = (quoteTest.author !== undefined) && (quoteTest.text !== undefined);
      assert.equal(booleanCheck,true);

    });
    it('should return a random quote if index not specified', function() {

       var randomQuote = Quote.getQuoteFromJSON();
       var arrayOfQuotes = Quote.getQuotesFromJSON();
       var flag = false;
       for(var i = 0; i < arrayOfQuotes.length; i++) {

         if(randomQuote === arrayOfQuotes[i]) {
           flag = true;
         }
       }

       assert.equal(flag,true);

    });
    it('should return the first quote if we pass 0', function() {

        assert.equal(Quote.getQuoteFromJSON(0), Quote.getQuotesFromJSON()[0]);

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {

      Quote.seed(function(error, seeded) {
        assert(seeded, "Database Error");
        done();

        });

    });
    it('should have populated the quotes collection with 102 document', function(done) {

      Quote.seed(function(err, quotes){
        assert(quotes.length === 102, "102 documents are already in the Database");
        done();

       });

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {

      Quote.seed(function(error, seeded) {
        assert(!seeded, "You have seeded the Database before");
        done();

      });

    });
    it('should not seed db again if db is not empty', function(done) {

      Quote.getQuotesFromDB(function(err, quotes){
        assert(quotes.length === 102, "The Database must have 102 documents, but this is not the case");
        done();

       });

    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {

      Quote.getQuotesFromDB(function(err, quotes){

        assert(quotes.length === 102, "Invalid total number of quotes.");
        done();

        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {

      Quote.getQuotesFromDB(function(errors, quotes) {
            Quote.getQuoteFromDB(function(error, quote) {

                    var flag = false;
                    for(var i = 0; i < quotes.length; i++) {

                       if(quote.author === quotes[i].author && quote.text === quotes[1].text){
                            flag = true;
                            break;
                     }

                   }

                    assert(flag, "The quote isn't in the Database");
                    done();
           });
      });

    });
    it('should return the first quote if passed 0 after callback', function(done) {

      Quote.getQuotesFromDB(function(errors, quotes){
        Quote.getQuoteFromDB(function(error, quote){
          assert(quote.author === quotes[0].author && quote.text === quotes[0].text,"Error Occurred");
          done();
          }, 0);
        });
      });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
    });
});
