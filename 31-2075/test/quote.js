// tests/quotes.js

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
        var element = Quote.getElementByIndexElseRandom(arr);
        assert(arr.indexOf(element) != -1);
    });
    
    it("should return the first element if we also pass the index 0", function() {
        var element = Quote.getElementByIndexElseRandom(arr, 0);
        assert.equal(element, 1);
    });
    
    it("should return the last element if we also pass the index", function() {
         var element = Quote.getElementByIndexElseRandom(arr, arr.length - 1);
        assert.equal(element, 5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.lengthOf(Quote.getQuotesFromJSON(), 102);
    });
    
    it("first quote in the array's author should be Kevin Kruse", function() {
        var array = Quote.getQuotesFromJSON();
        var quote = Quote.getElementByIndexElseRandom(array, 0);
        assert.equal(quote.author, 'Kevin Kruse');
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        assert.property(Quote.getQuoteFromJSON(), 'author');
        assert.property(Quote.getQuoteFromJSON(), 'text');
    });
    
    it('should return a random quote if index not specified', function() {
       var element = Quote.getQuoteFromJSON();
        assert(Quote.getQuotesFromJSON().indexOf(element) != -1);
    });
    
    it('should return the first quote if we pass 0', function() {
        assert.equal(Quote.getQuoteFromJSON(0), Quote.getQuotesFromJSON()[0]);
    });
});

// quotes collection should be called quotes
// describe('seed', function() {
//     before(db.clearDB);
//     it('should populate the db if db is empty returning true', function(done) {
//         // TODO: assert that seeded is true
//         Quote.seed(function(err,seeded){
//                 assert(seeded);
//                 done();
//         })
//     });
//     it('should have populated the quotes collection with 102 document', function(done) {
//         var collection=db.db().collection('quotes');
//         collection.count(function(err,count){
//             assert.equal(102,count);
//             done();
//         });
//     });
//     it('should not seed db again if db is not empty returning false in the callback', function(done) {
//         // TODO: assert that seeded is false
//         Quote.seed(function(err,seeded){
//             if(!err){
//                 assert(!seeded);
//                 done();
//             }
//         })
//     });
//     it('should not seed db again if db is not empty', function(done) {
//         // TODO: The database should have 102 quote still
//         var collection=db.db().collection('quotes');
//         collection.count(function(err,count){
//             assert.equal(102,count);
//             done();
//         });
//     });
// });

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, quotes){
            if(!err){
            assert.equal(quotes.length, 102);
            done();
            }
        })
    });
});

describe('getQuoteFromDB', function() {
   
it('should return a random quote document', function(done) {
        // TODO: see if it returns one of the quotes from all quotes
    Quote.getQuotesFromDB(function(err0,result) {
        if(!err0){
            Quote.getQuoteFromDB(function(err,quote){
                var flag=false;
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
                Quote.getQuotesFromDB(function(err,quotes){
                    assert(quotes[0],quote);
                    done();
                });
            }
        },0);
    });

});

describe('API', function() {
    // request = request(app);

it("should return a 404 for urls that don't exist", function(done) {
    request(app)
    .get('/apinowhere')
    .expect(404, done);
});

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request(app)
        .get('/api/quote')
        .expect('Content-Type', /json/)
        .expect(function(res){
            assert.property(res.body, '_id');
            assert.property(res.body, 'text');
            assert.property(res.body, 'author');
      }).expect(200,done);
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request(app)
        .get('/api/quotes')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(function(res){
        assert.isArray(res.body);
        }).expect(200,done);
    });
});