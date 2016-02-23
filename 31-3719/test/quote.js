var assert = require('chai').assert
var expect = require("chai").expect
var app = require('../app.js')
var request = require('supertest')
var Quote = require('../quotes.js')
var db = require('../db.js')

before(function(done) {
    db.connect(function(db) {
 		done()
    })
})


describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    var rndfn = Quote.getElementByIndexElseRandom
    it("should return a random element that is included in the array if we omit the index", function() {
        assert.include(arr, rndfn(arr), "array contains quote")
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.strictEqual(1, rndfn(arr, 0), "should return the first element")
    });
    it("should return the last element if we also pass the index 4", function() {
        assert.strictEqual(5, rndfn(arr, 4), "should return the last element")
    });
});


describe("getQuotesFromJSON", function() {
	var gqfj = Quote.getQuotesFromJSON()
    it("should return an array of 102 quote", function() {
        assert.lengthOf(gqfj, 102, "should return 102 quotes")
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal("Kevin Kruse", gqfj[0].author)
    });
});


describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(Quote.getQuoteFromJSON(), "author")
        assert.property(Quote.getQuoteFromJSON(), "text")
    });
    it('should return a random quote if index not specified', function() {
       assert.include(Quote.getQuotesFromJSON(), Quote.getQuoteFromJSON())
    });
    it('should return the first quote if we pass 0', function() {
        var q = Quote.getQuotesFromJSON()
        assert.equal(q[0], Quote.getQuoteFromJSON(0))
    });
});


describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded) {
        	assert.equal(null, err)
        	assert.equal(seeded, true)
        })
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        db.db().collection("quotes").count(function(err, count) {
        	assert.equal(null, err)
        	assert.equal(102, count)
        })
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        assert.equal(null, err)
        assert.equal(seeded, false)
    });
    it('should not seed db again if db is not empty', function(done) {
        db.db().collection("quotes").count(function(err, count) {
        	assert.equal(null, err)
        	assert.equal(102, count)
        })
    });
});


describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes) {
        	assert.equal(null, err)
        	assert.lengthOf(quotes, 102)
        })
    });
});


describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
    	Quote.getQuotesFromDB(function(err, quotes) {
    		assert.equal(null, err)
    		Quote.getQuoteFromDB(function(err, quote) {
    			assert.equal(null, err)
    			assert.include(quotes, quote)
    		})
    	})
    });
    it('should return the first quote if passed 0 after callback', function(done) {
    	Quote.getQuotesFromDB(function(err, quotes) {
    		assert.equal(null, err)
    		Quote.getQuoteFromDB(function(err, quote) {
    			assert.equal(null, err)
    			assert.equal(quotes[0], quote)
    		})
    	})
    });
});


describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request
        .get("/blablabla")
        .expect(404)
        .end(function(err, res) {
        	res.status.should.equal(404)
        	done()
        })
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request
        .get("/api/quote")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function(err, res) {
        	assert.equal(null, err)
        	assert.property(res, "author")
        	assert.property(res, "text")
        	assert.property(res, "_id")
        	done()
        })
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
    	request
    	.get("/api/quotes")
    	.expect("Content-Type", /json/)
    	.expect(200)
    	.end(function(err, res) {
    		done()
    	})
    });
});