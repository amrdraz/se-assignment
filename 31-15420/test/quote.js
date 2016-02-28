// tests/quotes.js

var assert = require('chai').assert;
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
 function  cont(arr,ele){
     for ( var i=0;i<arr.length;i++){
        if (arr[i]===ele) return true;
     }
     return false;
 }
describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        var t =Quote.getElementByIndexElseRandom(arr);
        var x=cont(arr,t);
        assert.equal(x,true);

    });
    it("should return the first element if we also pass the index 0", function() {
        var t =Quote.getElementByIndexElseRandom(arr,0);
        assert.equal(t,arr[0]);

    });
    it("should return the last element if we also pass the index", function() {
        var t =Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(t,arr[4]);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        var t =Quote.getQuotesFromJSON();
        assert.equal(t.length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        var t =Quote.getQuotesFromJSON();
        var a=t[0].author;
        assert.equal('Kevin Kruse',a);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        var quote =Quote.getQuoteFromJSON();
        var x=(quote.author!==undefined) && (quote.text!==undefined);
        assert.equal(x,true);
    });
    it('should return a random quote if index not specified', function() {
        var quote =Quote.getQuoteFromJSON();
        var x=cont(Quote.getQuotesFromJSON(),quote);
        assert.equal(x,true);

    });
    it('should return the first quote if we pass 0', function() {
        var quote =Quote.getQuoteFromJSON(0);
        assert.equal(quote,Quote.getQuotesFromJSON()[0]);
    });
});
//
 //quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(error, seeded){
                       assert(seeded, "Error in database");
                        done();
                   });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
            //console.log(quotes.length+"/////555");
            assert(quotes.length == 102, "unexpected length!!");
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(error, seeded){
                       assert(!seeded, "Error seeding already existing data");
                        done();
                   });
    });
    it('should not seed db again if db is not empty', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
            assert(quotes.length == 102, "Error length greater than 102");
                      done();
                    });
    });
});
//
describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
            assert(quotes.length == 102, "not the same number");
            done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function (done) {
        Quote.getQuotesFromDB(function (err, quotes) {
            Quote.getQuoteFromDB(function (err1, quote) {
                var f = false;
                for (var i = 0; i < quotes.length; i++) {
                    if (quotes[i].author === quote.author && quotes[i].text === quote.text) {
                        f = true;
                        break;
                    }
                }
                assert(f, "the quote is not in the database");
                done();
            });
        });
        it('should return the first quote if passed 0 after callback', function (done) {
            Quote.getQuotesFromDB(function(err, quotes){
                           Quote.getQuoteFromDB(function(err1, quote){
                                   assert(quote.author == quotes[0].author && quote.text == quotes[0].text,
                                    "error found  "+JSON.stringify(quote));
                                    done();
                                } , 0);
                       });
        });
    });
});

//describe('API', function() {
//    //request = request(app);
//    //it("should return a 404 for urls that don't exist", function(done) {
//    //
//    //});
//    //
//    //it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
//    //
//    //});
//
//    //it('/api/quotes should return an array of JSON object when I visit', function(done) {
//    //    // TODO: test with supertest
//    //});
//});