// tests/quotes.js

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(db,err) {
       if (err) return done(err);
       else{// Quote.setDB(db); Quote.setQuotesCollection(data.collection('quotes'));
        done();}
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {

        var element = Quote.getElementByIndexElseRandom(arr);
          expect(arr.indexOf(element)).to.not.equal(-1,"If equals -1 then not found!");
    });
    it("should return the first element if we also pass the index 0", function() {

        var element = Quote.getElementByIndexElseRandom(arr,0);
          expect(1).to.equal(element,"Must equal first element in array!");
    });
    it("should return the last element if we also pass the index", function() {
      var element = Quote.getElementByIndexElseRandom(arr,4);
        expect(5).to.equal(element,"Must equal first element in array!");
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var size= Object.keys(Quote.getQuotesFromJSON()).length;
          expect(size).to.equal(102);
          //Alternative (for self)   expect(Quote.getQuotesFromJSON()).to.have.lengthOf(102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var content= Quote.getQuoteFromJSON(0);
        expect(content.author).to.equal("Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
      //  expect(Quote.getQuoteFromJSON()).to.have.all.keys(['text', 'author']);
      var obj=Quote.getQuoteFromJSON();
       expect(obj).to.have.property('author');
       expect(obj).to.have.property('text');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var obj=Quote.getQuoteFromJSON();
       var all=Quote.getQuotesFromJSON();
        expect(obj).to.be.oneOf(all);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var obj=Quote.getQuoteFromJSON(0);
        expect(obj.author).to.equal("Kevin Kruse");
        expect(obj.text).to.equal("Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
   before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        // consol.log(Quote.getQuotesFromDB())
      Quote.clearQuotesFromDB();
      Quote.seed(function(err,seeded){
        expect(err).to.be.null;
        expect(seeded).to.be.true;
        done()
        })
      });
    it('should have populated the quotes collectio  n with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err,seeded){
          expect(err).to.be.null;
          expect(seeded).to.be.false; //dont need to seed again
          Quote.getQuotesFromDB(function(err,docs){
          expect(null).to.be.null;
          expect(docs).to.have.lengthOf(102);
          done();
        })
      })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
          expect(err).to.be.null;
          expect(seeded).to.be.false;
          done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err,seeded){
          expect(err).to.be.null;
         expect(seeded).to.be.false; //dont need to seed again
          Quote.getQuotesFromDB(function(err,docs){
          expect(null).to.be.null;
          expect(docs).to.have.lengthOf(102);
          done();
        })
      })
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,docs){
          expect(err).to.be.null;
          expect(docs).to.have.lengthOf(102);
          done();});
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuoteFromDB(function (err,quote){
          expect(err).to.be.null;
            Quote.getQuotesFromDB(function(err2,quotes){
              expect(err2).to.be.null;
              expect(quotes).to.contain(quote);
            done();
          });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function (err,quote){
            expect(err).to.be.null;
            expect(quote.author).to.equal("Kevin Kruse");
            expect(quote.text).to.equal("Life isn’t about getting and having, it’s about giving and being");
        done();
      },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
      request.get('/api/test').expect(404);
      done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        done();
    });
});
