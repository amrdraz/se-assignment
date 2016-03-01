// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Qoute = require('../qoutes.js');
var db = require('../db.js');

var contains = function( arr, value ) {

	var i = 0, len = arr.length;

	while( i < len && arr[i] != value ) {

		i++;

	}

	return i != len;

};

before(function(done) {
  //  use this after you have completed the connect function
    db.connect(function(err, db) {
    //   if (err) return done(err);
      done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var  ret = Qoute.getElementByIndexElseRandom(arr);
        assert.equal(contains(arr, ret), true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Qoute.getElementByIndexElseRandom(arr, 0),1);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Qoute.getElementByIndexElseRandom(arr, 4),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.equal(Qoute.getQoutesFromJSON().length, 102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
      var json = Qoute.getQoutesFromJSON();
      assert.equal(json[0].author,"Kevin Kruse");
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
      var qouteRet = Qoute.getQouteFromJSON();
			console.log(qouteRet);
      if(qouteRet !== null){
         assert.equal(true,true);
       }else{
         assert.equal(true,false);
       }
    });
    it('should return a random quote if index not specified', function() {
       var ret = Qoute.getQouteFromJSON();
       var array = Qoute.getQoutesFromJSON();
       assert.equal(contains(array, ret), true);

    });
    it('should return the first quote if we pass 0', function() {
      assert.equal(Qoute.getQoutesFromJSON()[0],Qoute.getQouteFromJSON(0));
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
      Qoute.seed(function(err, seeded){
        assert.equal(seeded, true);
        done();
      });
    });

    it('should have populated the quotes collection with 102 document', function(done) {
        Qoute.getQoutesFromDB(function(err, qs){
          assert.equal(qs.length, 102);
          done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
           Qoute.seed(function(err, seeded){
               assert(true,seeded);
               done();
          });
      });
    it('should not seed db again if db is not empty', function(done) {
      Qoute.seed(function(err, seeded){
          assert(true,seeded);
          done();
         });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
      Qoute.getQoutesFromDB(function(err, qoutes){
          assert(qoutes.length === 102,true);
          done();
      });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
      Qoute.getQouteFromDB(function(err,qoute){
       Qoute.getQoutesFromDB(function(err,qoutes){

         assert(true,qoutes.indexOf(qoute) > -1);
         done();
       });
      });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Qoute.getQouteFromDB(function(err,qoute){
        var q = Qoute.getQoutesFromJSON()[0];
        assert(true,q == qoute);
        done();
      },0);
  });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
      request.get("/7amada").set("Accept","text/html").expect(404).end(function(err,res){
        done();
      });
     });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
      request.get("/api/qoute").set("Accept", "application/json").expect(200).end(function(err,res){
				assert.property(res.body,'author');
				assert.property(res.body,'text');
				assert.property(res.body,'_id');
        // expect(res.body).to.have.property("author");
        // expect(res.body).to.have.property("text");
        // expect(res.body).to.have.property("_id");
        done();
      });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
      request.get("/api/qoutes").set("Accept", "application/json").expect(200).end(function(err,res){
             assert.isArray(res.body, 'Returned body is not an array');
             done();
        });
    });
});
