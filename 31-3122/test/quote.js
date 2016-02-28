// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
//var server=require('../server.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');
var should=require('chai').should;
var expect=require('chai').expect;

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
        var elem= Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(elem)!=-1);
    });
    it("should return the first element if we also pass the index 0", function() {
        var elem= Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(arr[0],elem);
    });
    it("should return the last element if we also pass the index", function() {
        var elem= Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(arr[4],elem);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var data=Quote.getQuotesFromJSON();
        assert.equal(102,data.length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var data=Quote.getQuotesFromJSON();
        assert.equal("Kevin Kruse",data[0].author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote=Quote.getQuoteFromJSON();
        assert(quote.hasOwnProperty('text'));
        assert(quote.hasOwnProperty('author'));

    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quote=Quote.getQuoteFromJSON();
       var data=Quote.getQuotesFromJSON();
       assert(data.indexOf(quote)!=-1);

   });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quote=Quote.getQuoteFromJSON(0);
        var data=Quote.getQuotesFromJSON();
        assert.equal(data[0],quote);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded){
            if(!err){
                assert(seeded);
                done();

            }

        })
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        var collection=db.db().collection('quotes');
        collection.count(function(err,count){
            assert.equal(102,count);
            done();
        });

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
            if(!err){
                assert(!seeded);
                done();
            }
        })
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        var collection=db.db().collection('quotes');
        collection.count(function(err,count){
            assert.equal(102,count);
            done();

        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,result){
            if(!err){
                assert.equal(102, result.length);
                done();
            }
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
        Quote.getQuotesFromDB(function(err0,result) {
            if(!err0)
            {
                Quote.getQuoteFromDB(function(err,quote){

                    var exists=false;
                    for (var i = result.length - 1; i >= 0; i--) {
                       if(JSON.stringify(result[i]) === JSON.stringify(quote))
                        {exists=true;
                            break;
                        }
                    };
                    assert(exists);
                    done();

                });
            }
        });

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err,quote){
            if(!err){
                Quote.getQuotesFromDB(function(err0,result){
                    assert(result[0],quote);
                    done();
                });
            }
        },0);
    });
});

describe('API', function() {

    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request(app)
        .get('/nowhere')
        .expect(404,done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request(app)
        .get('/api/quote')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res){
            expect(res.body).to.have.all.keys(['_id', 'author','text']);           
            done();

        });

    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request(app)
        .get('/api/quotes')
        .expect('Content-Type', /json/)
        .end(function(err,res){
            assert.isArray(res.body);
            expect(res.body[0]).to.have.all.keys(['_id', 'author','text']);
            done();

        });

    });
});