var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var expect =require('chai').expect;

before(function(done) {
    // use this after you have completed the connect function
    // db.connect(function(err, db) {
    //    if (err) return done(err);
    //    else done();
    // });
    db.connect(function(db){
        done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var t=Quote.getElementByIndexElseRandom(arr);
        var b =false;
        for (var i = 0; i < arr.length; i++) {
            if(arr[i]===t)b=true;
        }

        assert.equal(b,true);
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),arr[0]);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,4),arr[4]);
    });
});
describe("getQuotesFromJSON", function() {
    var t=Quote.getQuotesFromJSON();
    it("should return an array of 102 quote", function() {
        
        assert.equal(t.length,102);

    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(t[0].author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var t =Quote.getQuoteFromJSON();
        assert.equal((t.author===undefined||t.text===undefined),false);
    });
    it('should return a random quote if index not specified', function() {
       var t =Quote.getQuoteFromJSON();
       var tall=Quote.getQuotesFromJSON();
       var b=false;
       for (var i = 0; i < tall.length; i++) {
           if(t===tall[i])b=true;
       }
       assert.equal(b,true);
    });
    it('should return the first quote if we pass 0', function() {
        var t =Quote.getQuoteFromJSON(0);
       var tall=Quote.getQuotesFromJSON();
       assert.equal(t,tall[0]);
    });
});
// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err,b){
            assert.equal(b,true);
            
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err,q){
            assert.equal(q.length,102);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err,b){
            assert.equal(b,false);
            
            done();
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.seed(function(err,b){
            assert.equal(b,false);
            
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
         Quote.getQuotesFromDB(function(err,q){
            assert.equal(q.length,102);
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err,q){
            Quote.getQuotesFromDB(function(err,qall){
                var b =false;
                for (var i = 0; i < qall.length; i++) {
                    if(qall[i].author==q.author&&qall[i].text==q.text)b=true
                }

            assert.equal(b,true);
            done();
        });
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err,q){
            Quote.getQuotesFromDB(function(err,qall){ 
            assert.equal(q.author===qall[0].author&&q.text===qall[0].text,true);
            done();
        });
        },0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/bla').set("Accept","text/html").expect(404).end(function(err,res){
            done();
        });
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').set("Accept","application/json").expect(200).end(function(err,res){
            expect(res.body).to.have.property("text");
            expect(res.body).to.have.property("_id");
            expect(res.body).to.have.property("author");
            done();
    });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes').set("Accept","application/json").expect(200).end(function(err,res){
            expect(res.body).to.be.a("array");
            // for (var i = 0; i <res.body.length; i++) {
            //     expect(res.body[i]).to.have.property("text");
            // expect(res.body[i]).to.have.property("_id");
            // expect(res.body[i][i]).to.have.property("author");
            // }
            
            done();
    });
    });
});