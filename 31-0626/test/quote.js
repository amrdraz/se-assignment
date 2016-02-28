
var assert = require('chai').assert;
var app = require('../app.js');
var mocha = require('mocha');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

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
        // TODO
        assert.notEqual(arr.indexOf(Quote.getElementByIndexElseRandom(arr)),-1);
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),1);
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
       assert.equal(Quote.getElementByIndexElseRandom(arr,arr.length-1),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        assert.equal(Quote.getQuotesFromJSON().length,102);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        assert.equal(Quote.getQuotesFromJSON()[0].author,'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote=Quote.getQuoteFromJSON();
        assert.isDefined(quote.text, 'The quote object has the text property');
        assert.isDefined(quote.author, 'The quote object has the author property');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       assert.notEqual(Quote.getQuotesFromJSON().indexOf(Quote.getQuoteFromJSON()),-1);
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        assert.equal(Quote.getQuoteFromJSON(0).author,'Kevin Kruse');
    });
});

//quotes collection should be called quotes
// describe('seed', function() {
//     before(db.clearDB(function(err){
//     	if(err){
//     		console.log("Error");
//     	}else{
//     		console.log('nothing is wrong');
//     	}
//     }));
//     it('should populate the db if db is empty returning true', function(done) {
//         // TODO: assert that seeded is true
//         db.connect(function(err,db){
//         	Quote.seed(function(err,seeded){
//         	assert.isTrue(seeded);
//         });

//         });
//     });
//     it('should have populated the quotes collection with 102 document', function(done) {
//         // TODO: check that the database contains 102 document
//     });
//     it('should not seed db again if db is not empty returning false in the callback', function(done) {
//         // TODO: assert that seeded is false
//     });
//     it('should not seed db again if db is not empty', function(done) {
//         // TODO: The database should have 102 quote still
//     });
// });

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        db.connect(function(err,DB){
        	if(!err){
        		Quote.getQuoteFromDB(function(err, docs){
        			assert.equal(docs.length,102);
        		});
        		
        	}
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
         db.connect(function(err,DB){
        	var quotes=Quote.getQuotesFromJSON();

        	if(!err){
        		Quote.getQuoteFromDB(function(err, quote){
        			console.log(quote);
        			assert.notEqual(quotes.indexOf(quote),-1);
        		});
        		
        	}
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        db.connect(function(err,DB){
        	var quotes=Quote.getQuotesFromJSON();
        	if(!err){
        		Quote.getQuoteFromDB(function(err, quote){
        			assert.notEqual(quote,quotes[0]);
        		},0);
        		
        	}
        });
    });
});

// describe('API', function() {
//     request = request(app);
//     it("should return a 404 for urls that don't exist", function(done) {
//         // TODO: test with supertest
//     });

//     it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
//         // TODO: test with supertest
//     });

//     it('/api/quotes should return an array of JSON object when I visit', function(done) {
//         // TODO: test with supertest
//     });
// });

