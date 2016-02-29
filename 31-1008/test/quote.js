
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

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr);
       assert(arr.indexOf(element) > -1 , "Returned element is not in the array");
    });
    it("should return the first element if we also pass the index 0", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr,0)

        assert(arr[0]==element,"Expected to be" + arr[0]+ "found is" + element+ "");
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        var element = Quote.getElementByIndexElseRandom(arr, arr.length-1);
        assert(arr[arr.length-1]==element,"Expected was " + arr[arr.length-1]+ "found is" + element+"");

    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        var array = Quote.getQuotesFromJSON();
        assert(array.length == 102, "Expected was 102 found is" + array.length);

    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        var array = Quote.getQuotesFromJSON();
        var firstQuote = array[0];
        assert(firstQuote.author=="Kevin Kruse", "Expected to be Kevin Kruse found is"+firstQuote.author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote = Quote.getQuoteFromJSON();
        assert.property(quote, 'text');
        assert.property(quote,'author');
        assert.isObject(quote,'is an object');
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       var quotes = Quote.getQuotesFromJSON();
       var quote = Quote.getQuoteFromJSON();

       var exists = false;
       for(var i = 0; i<quotes.length; i++){
        if(quote.author === quotes[i].author && quote.text == quotes[i].text){
            exists = true;
            break;
        }
       }
       assert(exists, "The returned quote is not in the JSON file");
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var quotes = Quote.getQuotesFromJSON();
        var quote = Quote.getQuoteFromJSON(0);
        var firstIndex = false;
       if(quotes[0].author==quote.author && quotes[0].text == quote.text)
       	firstIndex=true;
       assert(firstIndex,"The returned quote is not in the first index, expected was "+quotes[0].text+quotes[0].author+"but was" + quote.text+ quote.author);

    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err,seeded){
          assert(seeded, "database is not filled");
          done();	
        });
      
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.getQuotesFromDB(function(err,quotes){
        assert(quotes.length==102,"Expected was 102 but it is "+ quotes.length+"documents");
        done();
        });
       
            });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(error, seeded){
            assert(!seeded, "Shouldn't seed a database already filled.");
            done();    
        });
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.getQuotesFromDB(function(err, quotes){
            assert(quotes.length == 102, "must not seed again, number of quotes should be 102 but was found "+quotes.length);    
            done();
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err,quotes){
        	assert(quotes.length==102,"it was expected to have 102 documents but was "+quotes.length);
        done();
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        Quote.getQuotesFromDB(function(err,quotes){
        	Quote.getQuoteFromDB(function(err1,quote){
        		var exists = false;
                for(var i = 0; i < quotes.length; i++){
                    if(quotes[i].author == quote.author && quotes[i].text == quote.text){
                        exists=true;
                        break;
                    }
                }
                assert(exists, "The quote returned is not in the database");
               done();
        	});
        });

    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
         Quote.getQuotesFromDB(function(err, quotes){
            Quote.getQuoteFromDB(function(err1, quote){
                assert(quote.author == quotes[0].author && quote.text == quotes[0].text,"it was expected to be the first quote in the database but was"+quote.text+" "+ quote.author); 
            done();
            } , 0);
        });
    });
    });



describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
                request.get('/invalid_page').expect(404,done);

    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/quote')
        .expect('Content-Type', /json/)
        .end(function(err, res){
            var quote = res.body;
             assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            assert.isObject(quote, 'body is an object');
           
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest

        request.get('/api/quotes')
        .end(function(err, res){
            var quotes = res.body;
            assert.isArray(quotes, 'Returned body is not an array');
            var quote = quotes[0];
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });
});

