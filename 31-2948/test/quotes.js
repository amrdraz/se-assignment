
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



function found2(arr,element)

{

    for(var i = 0 ; i < arr.length; i++)

    {

        if(arr[i].author == element.author && arr[i].text == element.text) return true;

    }

    return false;

}

function found(arr,element)
{
      for(var i = 0 ; i < arr.length; i++)

    {

        if(arr[i] == element) return true;

    }

    return false;

}


describe("getElementByIndexElseRandom", function() {

    var arr = [1, 2, 3, 43, 5];

    it("should return a random element that is included in the array if we omit the index", function() {

       var  ele = Quote.getElementByIndexElseRandom(arr);



       assert.equal(found(arr,ele),true);

    });

    it("should return the first element if we also pass the index 0", function() {

        // TODO

        var ele = Quote.getElementByIndexElseRandom(arr,0);

        assert.equal(ele,arr[0]);

    });

    it("should return the last element if we also pass the index", function() {

        var ele = Quote.getElementByIndexElseRandom(arr,4);

        assert.equal(ele,arr[4]);

    });

});



describe("getQuotesFromJSON", function() {

    it("should return an array of 102 quote", function() {

        // TODO: you know how many quotes are there

        var ele = Quote.getQuotesFromJSON();

        assert.equal(ele.length,102);

    });

    it("first quote in the array's author should be Kevin Kruse", function() {

        // TODO: you know the content of first quote

        var q = Quote.getQuoteFromJSON(0);



        assert.equal(q.author,'Kevin Kruse');

    });

});



describe("getQuoteFromJSON", function() {

    it('should return a quote object with an author and text property', function() {

        var q = Quote.getQuoteFromJSON();

        assert(q.author);
        assert(q.text);
    });

    it('should return a random quote if index not specified', function() {



       var allqs = Quote.getQuotesFromJSON();

       var me = Quote.getQuoteFromJSON();

       assert.equal(true,found2(allqs,me));

    });

     it('should return the first quote if we pass 0', function() {
       var quote = Quote.getQuoteFromJSON(0);
        assert.equal(quote.author, "Kevin Kruse");
        assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being");
    });

});



// quotes collection should be called quotes

describe('seed', function() {

    before(db.clearDB);

    it('should populate the db if db is empty returning true', function(done) {



        // TODO: assert that seeded is true
        Quote.seed(function(seeded,err)
        {
            assert.equal(seeded,true);
            done();
        });

    });
});

    it('should have populated the quotes collection with 102 document',function(done) {

        // TODO: The database should have 102 quote still

       Quote.getQuotesFromDB(function(err,qes){

                   assert(qes.length,102);


       done();




       });

       });

    it('should not seed db again if db is not empty returning false in the callback', function(done) {

         Quote.seed(function(seeded,err)
        {
            assert.equal(!seeded,true);
            done();
        });

    });

    it('should not seed db again if db is not empty', function(done) {

        // TODO: The database should have 102 quote still

       Quote.getQuotesFromDB(function(err,qes){

                   assert(qes.length,102);


       done();




       });

       });




describe('getQuotesFromDB', function() {
    it('should return all quotes documents in the database', function(done) {
        Quote.getQuotesFromDB(function(err, docs){
            assert.equal(docs.length, 102);
            done();
        });
    });
});


describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            assert(true,found2(Quote.getQuotesFromJSON(),quote));
            done(err);
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        Quote.getQuoteFromDB(function(err, quote){
            assert.equal(quote.author, "Kevin Kruse", "Author mismatch");
            assert.equal(quote.text, "Life isn’t about getting and having, it’s about giving and being", "text mismatch");
            done(err);
        }, 0);
    });
});
