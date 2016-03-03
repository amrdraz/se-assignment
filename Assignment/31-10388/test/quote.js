var assert = require('chai').assert;
var expect = require('chai').expect;
var request = require('supertest');
var app = require('/home/ibraheem/Assignment/31-10388/app.js');
var Quote = require('/home/ibraheem/Assignment/31-10388/static/js/quotes.js');
var db = require('/home/ibraheem/Assignment/31-10388/db.js');

before(function(done) {
    db.connect(function(db) {
       done();
    });
});


describe("getElementByIndexElseRandom", function() {

    var arr = [1, 2, 3, 43, 5];

    it("should return a random element that is included in the array if we omit the index", function() {
        var rand = Quote.getElementByIndexElseRandom(arr);
        console.log("Random => ", rand);
        var index = arr.indexOf(rand);
        expect(index).to.be.greaterThan(-1);
    });

    it("should return the first element if we also pass the index 0", function() {
        var first = Quote.getElementByIndexElseRandom(arr,0);
        expect(first).to.equal(1);
    });

     it("should return the last element if we also pass the index", function() {
         var last = Quote.getElementByIndexElseRandom(arr, 4);
         expect(last).to.equal(5);
    });

});

describe("getQuotesFromJSON", function() {

    var quotes = Quote.getQuotesFromJSON(function(err,array){

        if(err == null){

            it("should return an array of 102 quote", function() {
                expect(array.length).to.equal(102);
            });

            it("first quote in the array's author should be Kevin Kruse", function() {
                expect(array[0].author).to.equal('Kevin Kruse');
            });

        }

        else{
            console.log(err);
        }

    });
});

describe("getQuoteFromJSON", function() {

    it('should return a quote object with an author and text property', function() {

        Quote.getQuoteFromJSON(function(err,quote){
            if(err == null){
                assert.isObject(quote, 'It is an object');
                assert.property(quote, 'author');
                assert.property(quote, 'text');
            }
        });

    });

    it('should return a random quote if index not specified', function() {

        Quote.getQuoteFromJSON(function(err,quote){

            if(err == null){

                    Quote.getQuotesFromJSON(function(err1,array){
                        if(err1 == null){
                            var found = false;
                            for(var i = 0; i< array.length; i++){
                                if(quote.author == array[i].author && quote.text == array[i].text){
                                    found = true;
                                    break;
                                }
                            }
                            assert(found, "Not there");
                        }
                    });                    

            }

        });

    });

    it('should return the first quote if we pass 0', function() {

            Quote.getQuoteFromJSON(function(err,quote){

                 Quote.getQuotesFromJSON(function(err1,array){

                    if(err1 == null){

                        assert(quote.author == array[0].author && quote.text == array[0].text,  'Unexpected quote');

                    }

                 }); 

            },0);
    });              

});


describe('seed', function() {

    it('should populate the db if db is empty returning true', function(done) {

        db.connect(function(err,database){

            db.clearDB(function(){

                Quote.seed(function(error, seeded){
                    assert(seeded, "Cannot seed");
                    done();    
                });

            });
        });

    });

    it('should have populated the quotes collection with 102 document', function(done) {
        Quote.getQuotesFromDB(function(err, array){
            expect(array.length).to.equal(102);    
            done();
        });
    });

    it('should not seed db again if db is not empty returning false in the callback', function(done) {
         Quote.seed(function(error, seeded){
            assert(seeded == false, "Shouldn't seed when the database is already populated");
            done();    
        });

    });

    it('should not seed db again if db is not empty', function(done) {
        Quote.getQuotesFromDB(function(err, array){
            expect(array.length).to.equal(102);  
            done();
        });
    });

});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, array){
            expect(array.length).to.equal(102); 
            done();
        });
    });
});

describe('getQuoteFromDB', function() {

    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err, array){
            Quote.getQuoteFromDB(function(err2, quote){
                var found = false;
                for(var i = 0; i < array.length; i++){
                    if(array[i].author === quote.author && array[i].text === quote.text){
                        found = true;
                        break;
                    }
                }
                assert(found, "Quote is not in the database");
                done();
            });
        });
    });

    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err, array){
            Quote.getQuoteFromDB(function(err2, quote){
                assert(quote.author == array[0].author && quote.text == array[0].text);
                done();
            } , 0);
        });
    });

});

describe('API', function() {

    request = request(app);

    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/hello').expect(404,done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote')
        .expect('Content-Type', /json/)
        .end(function(err, result){
            var quote = result.body;
            assert.isObject(quote, 'It is an object');
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes')
        .end(function(err, result){
            var quotes = result.body;
            assert.isArray(quotes, 'result is not an array');
            var quote = quotes[0];
            assert.property(quote, '_id');
            assert.property(quote, 'author');
            assert.property(quote, 'text');
            done();
        });
    });

});
