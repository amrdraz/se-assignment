

// tests/quotes.js

var assert = require('chai').assert;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../public/quotes');
var db = require('../db.js');
var api=request('http://localhost:8080');


   before(function (done) {
        // use this after you have completed the connect function
        db.connect(function (err, db) {
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
        // TODO
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),1);
    });
    it("should return the last element if we also pass the index", function() {
        // TODO
        assert.equal(Quote.getElementByIndexElseRandom(arr,4),5);
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        assert.equal(Quote.getQuotesFromJSON().length,102)
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuoteFromJSON(0).author,'Kevin Kruse');

        // TODO: you know the content of first quote
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        assert.typeOf(Quote.getQuoteFromJSON().author,'string');
        assert.typeOf(Quote.getQuoteFromJSON().text,'string')
    });
    it('should return a random quote if index not specified', function() {
        // TODO: is the returned quote in the all quotes array?'
       var a=Quote.getQuotesFromJSON();
        var obj=Quote.getQuoteFromJSON();
        var isIn=false;
            for (var i = 0; i < a.length; i++) {
                if ((a[i].author)==(obj.author)&&((a[i].text)==(obj.text))) {
                    isIn=true;
                    break;

                }
            }
        assert.equal(isIn,true);


    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        var obj=Quote.getQuoteFromJSON(0);

        assert.equal(obj.author,"Kevin Kruse");
        assert.equal(obj.text,"Life isn’t about getting and having, it’s about giving and being");
    });
});

// quotes collection should be called quotes
 describe('seed', function() {

    before(function(done){

       db.clearDB(function(){
           done();



       })
    });

        it('should populate the db if db is empty returning true', function(done) {
            // TODO: assert that seeded is true

                Quote.seed(function(err,seeded){
                    assert.equal(seeded,true);
                    done();
            });


            });



    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        db.db().collection('quotesCollection').count(function(err,count){
            assert.equal(count,102);
            done();
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err,seeded){
            assert.equal(seeded,false);
            done();

        })

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        db.db().collection('quotesCollection').count(function(err,count){
            assert.equal(count,102);
            done();
        });

    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        var arr=Quote.getQuotesFromDB(function(err,result){
            assert.equal(result.length,102);
            done();

        })
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
        // TODO: see if it returns on of the quotes from all quotes
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
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
        // TODO: test with supertest
        request.get('/blablabla').expect(404);
        done();

    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
       api.get('/api/quote').
           set('Accept','application/json').
           expect(200).
           end(function(err,res){
           expect(res.body).to.have.property("_id");
           expect(res.body).to.have.property("text");
           expect(res.body).to.have.property("author");


       });
        done();
        });




    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        api.get('/api/quotes').
        set('Accept','application/json').
        expect(200);
        done();






    });
});