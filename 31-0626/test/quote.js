
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
var contains = function(array, element){
		for (var i = array.length - 1; i >= 0; i--) {
			if(array[i].text===element.text){
				return true;
			}
		}
		return false;
}

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        var quote=Quote.getQuoteFromJSON();
        assert.isDefined(quote.text, 'The quote object should the text property');
        assert.isDefined(quote.author, 'The quote object should the author property');
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

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        	db.connect(function(err, DB){
        		 Quote.seed(function(error, seeded){
            assert(seeded, "The seeded should be true");
            done();  

        	});
        
        	  
        });
        });

        
    
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        db.connect(function(err, DB){
        	db.db().collection('quotes').count(function(error,count){
            assert.equal(count,102, "The count is expected to be 102 but was "+count);
            done();  

        	});});

    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        db.connect(function(err, DB){
        		 Quote.seed(function(error, seeded){
            assert.isFalse(seeded, "The seeded should be false but was "+seeded);
            done();  

        	});});
    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
         db.connect(function(err, DB){
        	db.db().collection('quotes').count(function(error,count){
            assert.equal(count,102, "The count is expected to be still 102 but was "+count);
            done();  

        	});
    });});
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        var length=0;
        db.connect(function(err,DB){
        	if(!err){
        		Quote.getQuotesFromDB(function(err, docs){
        			length=docs.length;
        			assert.equal(length,102);
        			done();
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
        		Quote.getQuoteFromDB(function(err, quote){
        			assert.isTrue(contains(quotes,quote));
        			done();
        		});
        		
        	
        	

        	
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        db.connect(function(err,DB){
        	var quotes=Quote.getQuotesFromJSON();
        	if(!err){
        		Quote.getQuoteFromDB(function(err, quote){
        			assert.equal(quote.text,quotes[0].text);
        			done();
        		},0);
        		
        	}
        });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request
      .get('/user')
      .expect(404, done);

        });

    

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request
      .get('/api/quote')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        assert.isObject(res.body);
        assert.isDefined(res.body._id,'JSON should have _id as a property');
        assert.isDefined(res.body.author,'JSON should have author as a property');
        assert.isDefined(res.body.text,'JSON should have text as a property');
        done();});
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request
      .get('/api/quotes')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err,res) {
        assert.isArray(res.body, 'should be JSON array');
        assert.equal(res.body.length,102,'JSON  array should have 102 quotes');
        done();});
    });
    
});

