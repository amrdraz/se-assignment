var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../public/quotes.js');
var db = require('../db.js');
var api=request('http://localhost:3000');


before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
        if (err) return done(err);
        else done();
     });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr,Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),1);
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,4),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.equal(Quote.getQuotesFromJSON().length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuoteFromJSON(0).author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.typeOf(Quote.getQuoteFromJSON().author,'string');
        assert.typeOf(Quote.getQuoteFromJSON().text,'string');
    });
    it('should return a random quote if index not specified', function() {
        var array=Quote.getQuotesFromJSON();
        var q=Quote.getQuoteFromJSON();
        var exists=false;
            for (var i = 0; i < a.length; i++) {
                if ((array[i].author)==(q.author)&&((array[i].text)==(q.text))) {
                    exists=true;
                    break;

                }
            }
        assert.equal(exists,true);

    });
    it('should return the first quote if we pass 0', function() {
        var q=Quote.getQuoteFromJSON(0);
        assert.equal(q.author,"Kevin Kruse");
        assert.equal(q.text,"Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(function(done){
        db.clear(function(){
            done();
        });
    });
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err,seeded){
            assert.equal(seeded,true);
            done();
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection('quotes').count(function(err,count){
            assert.equal(count,102);
            done();
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err,seeded){
            assert.equal(seeded,false);
            done();
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection('quotes').count(function(err,count){
            assert.equal(count,102);
            done();
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database//', function(done) {
        var arr=Quote.getQuotesFromDB(function(err,result){
            assert.equal(result.length,102);
            done();
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err,result){
           Quote.getQuotesFromDB(function(err2,arr){

                assert.include(arr,result);
               done();
            });    
       });
    it('should return the first quote if passed 0 after callback', function(done) {
            Quote.getQuoteFromDB(function(err,result){
            assert.equal(result.author,'Kevin Kruse');
            assert.equal(result.text,'Life isn’t about getting and having, it’s about giving and being');
            done();
        },0)
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/totallyIrrelevant').expect(404);
        done();
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        api.get('/api/quote').set('Accept','application/json').expect(200).end(function(err,result){
            expect(result.body).to.have.property("_id");
            expect(result.body).to.have.property("text");
            expect(result.body).to.have.property("author");
        });
        done();
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        api.get('/api/quotes').set('Accpet','application/json').expect(200).end(function(err,result){
            var array = res.body;
            var q = array[0];
            assert.equal(((q[0]=='_id')&&(q[1]=='author')&&(q[2]=='text')),true);
            done();
        });
        done();
    });
});