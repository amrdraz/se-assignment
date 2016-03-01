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

function f(array, element) {
for (i = 0; i < array.length; i++) {
    if(array[i].text == element.text&&array[i].author == element.author)
        return true;
}
return false;
}

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        // TODO
       assert.equal(arr.indexOf(Quote.getElementByIndexElseRandom(arr))!= -1, true, 'Not in the array');
       

    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,0),1, 'error');
        // TODO
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(Quote.getElementByIndexElseRandom(arr,arr.length-1),5, 'error')
        // TODO
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        assert.equal(Quote.getQuotesFromJSON().length == 102,true, 'error');
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        assert.equal(Quote.getQuotesFromJSON()[0].author == 'Kevin Kruse',true, 'error');
        // TODO: you know the content of first quote
    });
});


describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
       var a = Quote.getQuoteFromJSON();
       console.log(a);
        assert.equal(a.author != "undefined"&& a.text != "undefined",true,'error')
        // TODO: check that the returned quote has text and author
    });
    
    it('should return a random quote if index not specified', function() {
        var b = Quote.getQuotesFromJSON();
        var a = Quote.getQuoteFromJSON();
        assert.equal(f(b,a),true,'error');

       // TODO: is the returned quote in the all quotes array?
    });
    it('should return the first quote if we pass 0', function() {
        var a = Quote.getQuoteFromJSON(0);
        var b = Quote.getQuotesFromJSON();
        assert.equal(a.author == b[0].author && a.text == b[0].text, true,'error' )
    });
});

quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        Quote.seed(function(err, seeded) {
                       assert.equal(seeded==true,true,'error');
            done();
        });
        // TODO: assert that seeded is true
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        var a = db.db().collection('quotes').find().toArray(function(err,data){
               assert.equal(data.length==102,true,'error');
               done();
        });
        
        // TODO: check that the database contains 102 document
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        Quote.seed(function(err, seeded) {
                       assert.equal(seeded==false,true,'error');
            done();
        });
        // TODO: assert that seeded is false
    });
    it('should not seed db again if db is not empty', function(done) {
        var a = db.db().collection('quotes').find().toArray(function(err,data){
               assert.equal(data.length==102,true,'error');
               done();
        });
        // TODO: The database should have 102 quote still
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
       Quote.getQuotesFromDB(function(err,data){
        assert.equal(data.length==102,true,'error');
        done();

       });
        // TODO: there should be 102 documents in the db
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuotesFromDB(function(err,data){
            Quote.getQuoteFromDB(function(err,data1){
                console.log('here');
                assert.equal(f(data,data1),true,'error');
                  done();
            });
        // TODO: you know the content of object in the file
    });
    });
  
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuotesFromDB(function(err,data){
            Quote.getQuoteFromDB(function(err,data1){
                assert.equal(data[0].text == data1.text,true,'error');
                done();
            },0);

        // TODO: you know the content of object in the file
    });
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/fg').expect(404,done);
        // TODO: test with supertest
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        request.get('/api/quote').expect(200).expect('Content-type', 'application/json; charset=utf-8').
        end(function(err,response){
            if (err) throw err;
            var a = JSON.parse(response.text);
            assert.equal(typeof a.author != 'undefined' && typeof a.text != 'undefined' && typeof a._id != 'undefined', true);
            done();

        });
        // TODO: test with supertest
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        request.get('/api/quotes').expect(200).expect('Content-type', 'application/json; charset=utf-8').
        end(function(err,response){
            if (err) throw err;
            var a = JSON.parse(response.text);
            assert.equal(Array.isArray(a),true);
            done();
        // TODO: test with supertest
    });
});

 });