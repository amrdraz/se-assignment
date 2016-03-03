// tests/quotes.js
var should = require('chai').should;
var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var dbFile = require('../db.js');
var routes = require('../routes.js');


before(function(done) {
    // use this after you have completed the connect function
    dbFile.connect(function(db, err) {
       if (err) done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var found = false;
        var randomElement = Quote.getElementByIndexElseRandom(arr);
        for (var i = 0; i < arr.length; i++) {
          if(arr[i] == randomElement) {
            found = true;
            break;
          }
        }
        assert.equal(found,true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(1,Quote.getElementByIndexElseRandom(arr,0));
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(5,Quote.getElementByIndexElseRandom(arr,arr.length-1));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.equal(102,Quote.getQuotesFromJSON().length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal("Kevin Kruse",Quote.getQuoteFromJSON(0).author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
      var quoteObj = Quote.getQuoteFromJSON();
      assert.equal(true , quoteObj.author != null && quoteObj.text != null);
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quoteObj = Quote.getQuoteFromJSON();
       var quotesArr = Quote.getQuotesFromJSON();
       var found = false;
       for (var i = 0; i < quotesArr.length; i++) {
         if(quotesArr[i].text == quoteObj.text && quotesArr[i].author == quoteObj.author){
           found = true ;
           break;
         }
       }
       assert.equal(true,found);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quoteObj = Quote.getQuoteFromJSON(0);
        var isOk = false;
        if(quoteObj.author == "Kevin Kruse" && quoteObj.text == "Life isn’t about getting and having, it’s about giving and being")
          isOk = true;
        assert.equal(true,isOk);
    });
});

// describe('db Function', function() {
//     it('should return the database if it is not null and throws an error if no database connected ', function() {
//         assert.throw(dbFile.db() , 'db is not initialized');
//     });
// });

// quotes collection should be called quotes







describe('seed', function() {
    before(dbFile.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded){
          assert.equal(true,seeded);
          done(err);
        });

    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err,seeded){
          if(seeded == true)
            {
              var DB = dbFile.db();
              var quotes = DB.get('quotes');
              quotes.find({},{},function(err , docs){
                assert.equal(102,docs.length);
                done(err);
              });
            }
            done(err);
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){});
        Quote.seed(function(err,seeded){
          assert.equal(false,seeded);
          done(err);
        });

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err,seeded){});
        Quote.seed(function(err,seeded){
          if(seeded == false){ // seeded is false
          var DB = dbFile.db();
          var quotes = DB.get('quotes');
          quotes.find({},{},function(err , docs){
            assert.equal(102,docs.length);
        });
      }
      done(err);
    });
});
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err , quotes){
          assert.equal(102,quotes.length);
        });
        done();
    });
});


describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err,quote){
          Quote.getQuotesFromDB(function(err2 , quotes){          // to check if the random quote exists in all quotes in DB
            var found = false;
            for (var i = 0; i < quotes.length; i++) {
              if(quotes[i].author == quote.author && quotes[i].text == quote.text)
              {
                found = true;
                break;
              }
            }
            assert.isOk(found);
            done(err);
          });
        });
      });

    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
          Quote.getQuoteFromDB(function(err , quote){
            assert(true , quote.author == "Kevin Kruse" && quote.text == "Life isn’t about getting and having, it’s about giving and being");
            if(err)
              done(err);
          },0);
          done();
    });
});

describe('API', function() {
    request = request(app);

    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/notValidUrl').expect(404, done)
      });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote').set('Accept', 'application/json').expect(function(res){
          if(!(res.body['_id'] && res.body['text'] && res.body['author']))
            throw new Error("Keys mismatch");

        }).expect(200, done);
    });
    // //--------------------------------------------- implemented by me --------------------------------------------------------------------
    it('/ should return the home page with 200 OK', function(done) {
        // TODO: test with supertest
        request.get('/').expect(200, done);
      });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get('/api/quotes')

        .expect('Content-Type', /json/)
        .expect(function(res){
          if(!Array.isArray(res.body))
            throw new Error('no array returned');
          for (var i = 0; i < (res.body).length; i++) {
            if(typeof res.body[i] !== 'object')
              throw new Error('returned array does not contain objects ');
          }
        })
        .expect(200, done);
    });

});
