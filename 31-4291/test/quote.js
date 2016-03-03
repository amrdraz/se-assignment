// // tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
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
        var randomElement=Quote.getElementByIndexElseRandom(arr);
        assert.includeMembers(arr,[randomElement],'getElementByIndexElseRandom returns random element');
    });
    it("should return the first element if we also pass the index 0", function() {
    	var randomElement=Quote.getElementByIndexElseRandom(arr,0);
    	assert.equal(arr[0],randomElement,'getElementByIndexElseRandom returns first element when index 0 is passed');
        // TODO
    });
    it("should return the last element if we also pass the index", function() {
    	var randomElement=Quote.getElementByIndexElseRandom(arr,arr.length-1);
    	assert.equal(arr[arr.length-1],randomElement,'getElementByIndexElseRandom returns first element when last index is passed');
        // TODO
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
    	var numberOfQuotes=Quote.getQuotesFromJSON().length;
    	assert.equal(102,numberOfQuotes,'getQuotesFromJSON returned 102 quotes');
        // TODO: you know how many quotes are there
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
    	var firstQuote=Quote.getQuoteFromJSON(0).author;
    	assert.equal(firstQuote,'Kevin Kruse','First quote author from getQuoteFromJSON is Kevin Kruse');
        // TODO: you know the content of first quote
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
    	var object=Quote.getQuoteFromJSON();
    	assert.property(object,'author','object returned has author property');
    	assert.property(object,'text','object returned has text property');
        // TODO: check that the returned quote has text and author
    });
    it('should return a random quote if index not specified', function() {
    	var quotes=Quote.getQuotesFromJSON();
    	var object=Quote.getQuoteFromJSON();
    	assert.includeMembers(quotes,[object],'a random quote returned from getQuoteFromJSON when no index specified');
       // TODO: is the returned quote in the all quotes array?
    });
    it('should return the first quote if we pass 0', function() {
    	var quotes=Quote.getQuotesFromJSON();
    	var object=Quote.getQuoteFromJSON(0);
    	assert.equal(quotes[0],object,'First quote returned when index 0 entered to getQuoteFromJSON');
        // TODO: you know the content of first quote
    });
});

// quotes collection should be called quotes
// describe('seed', function() {
//     before(db.clearDB);
//     it('should populate the db if db is empty returning true', function(done) {
//         Quote.seed(function(err,seeded){
//             assert.isTrue(seeded,'db populated when it was empty');
//             done();
//         });
//         // TODO: assert that seeded is true
//     });
//     it('should have populated the quotes collection with 102 document', function(done) {
//         Quote.getQuotesFromDB(function(err,quotes){
//             assert.count(quotes,102,'db populated with 102 documents');
//             done();
//         });
//         // TODO: check that the database contains 102 document
//     });
//     it('should not seed db again if db is not empty returning false in the callback', function(done) {
//         Quote.seed(function(err,seeded){
//             assert.isNotTrue(seeded,'db not populated when it was not empty');
//             done();
//         });
//         // TODO: assert that seeded is false
//     });
//     it('should not seed db again if db is not empty', function(done) {
//           Quote.getQuotesFromDB(function(err,quotes){
//             assert.count(quotes,102,'db still has 102 documents, not 204');
//             done();
//         });
//         // TODO: The database should have 102 quote still
//     });
// });

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
    	var quotes=Quote.getQuotesFromDB(function(err,quotes){
    		assert.equal(102,quotes.length,'all quote documents returned when getQuotesFromDB used');
    		done();
    	});
        // TODO: there should be 102 documents in the db
    });
});

// describe('getQuoteFromDB', function() {
//     it('should return a random quote document', function(done) {
//     	Quote.getQuoteFromDB(function(err,randomQuote){
//     		Quote.getQuotesFromDB(function(err,quotes){
//     			assert.include(quotes,randomQuote,'random quote returned when getQuoteFromDB used');
//     			done();
//        		}); 

//     	});

//         // TODO: see if it returns on of the quotes from all quotes
//     });
//     it('should return the first quote if passed 0 after callback', function(done) {
// 	    Quote.getQuoteFromDB(function(err,firstQuote){
// 			Quote.getQuotesFromDB(function(err,quotes){
// 				assert.equal(firstQuote,quotes[0],'return 1st quote of the database when getQuoteFromDB and index 1 used');
// 				done();
// 	   		}); 

// 		},0);
//         // TODO: you know the content of object in the file
//     });
// });

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/kdk').expect(400,done());
        // TODO: test with supertest
    });

    // it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
    //     request.get('/api/quote')
    //             .end(function(err,res){
    //                 var j=JSON.parse(res);
    //                 assert.property(j,'_id','object returned has id property');
    //                 assert.property(j,'text','object returned has text property');
    //                 assert.property(j,'author','object returned has author property');
    //                 done();
    //             });
    //     // TODO: test with supertest
    // });

    // it('/api/quotes should return an array of JSON object when I visit', function(done) {
    //     // TODO: test with supertest
    // });
});