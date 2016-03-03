var assert = require('chai').assert;
 var app = require('../app.js');
 var request = require('supertest');
 var Quote = require('../quotes.js');
 var db = require('../db.js');
 
 /*before(function(done) {

      db.connect(function(db) {
         done();
      });
});*/

 describe("getElementByIndexElseRandom", function() {
     var arr = [1, 2, 3, 43, 5];
     it("should return a random element that is included in the array if we omit the index", function() {
        var onequote =Quote.getElementByIndexElseRandom(arr);
        var flag=false;
        for ( var i=0;i<arr.length;i++){
        if (arr[i]===onequote) flag=true;
    }
    assert.equal(flag,true);

     });
    it("should return the first element if we also pass the index 0", function() {
       var onequote =Quote.getElementByIndexElseRandom(arr,0);
         assert.equal(onequote,arr[0]);
     });
     it("should return the last element if we also pass the index", function() {
        var onequote =Quote.getElementByIndexElseRandom(arr,4);
        assert.equal(onequote,arr[4]);
 
     });
 });
 
 describe("getQuotesFromJSON", function() {
     
 
     it("should return an array of 102 quote", function() {
        var t =Quote.getQuotesFromJSON();
        assert.equal(t.length,102);;
     });
     it("first quote in the array's author should be Kevin Kruse", function() {
       var t =Quote.getQuotesFromJSON();
         var a=t[0].author;
         assert.equal('Kevin Kruse',a);
     });
 });
 
 describe("getQuoteFromJSON", function() {
   
     it('should return a quote object with an author and text property', function() {
          var quote =Quote.getQuoteFromJSON();
        var flag=(quote.author!==undefined) && (quote.text!==undefined);
         assert.equal(flag,true);
          });
     it('should return a random quote if index not specified', function() {
        var quote =Quote.getQuoteFromJSON();
       var flag=false;
      var array= Quote.getQuotesFromJSON();
        for ( var i=0;i<array.length;i++){
        if (array[i]===quote) flag=true;
    }
    assert.equal(flag,true);
 
     });
     it('should return the first quote if we pass 0', function() {
         var quote =Quote.getQuoteFromJSON(0);
        assert.equal(quote,Quote.getQuotesFromJSON()[0]);
     });
 });
 
 // quotes collection should be called quotes
 describe('seed', function() {
     before(db.clearDB);
     it('should populate the db if db is empty returning true', function(done) {
         Quote.seed(function(err , seeded){
             assert.isTrue(seeded , "Done..");
             done();
         });
     });
     it('should have populated the quotes collection with 102 document', function(done) {
          Quote.getQuotesFromDB(function(err , docs){
             assert.equal(docs.length , 102 , "Done..");
             done();
         });
     });
     it('should not seed db again if db is not empty returning false in the callback', function(done) {
           Quote.seed(function(err , seeded){
             assert.isNotTrue(seeded , "Done..");
             done();
         });
     });
     it('should not seed db again if db is not empty', function(done) {
           Quote.getQuotesFromDB(function(err , docs){
             assert.equal(docs.length , 102 , "Done..");
             done();
         });
     });
 });
 
 describe('getQuotesFromDB', function() {
     it('should return all quote documents in the database', function(done) {
         Quote.getQuotesFromDB(function(err , thequotes){
             assert.equal(thequotes.length , 102 );
             done();
         });
     });
 });
 
 describe('getQuoteFromDB', function() {
     it('should return a random quote document', function(done) {
         Quote.getQuotesFromDB(function(err , thequotes){
             Quote.getQuoteFromDB(function(err , onequote){
                 assert.include(thequotes, onequote );
                 done();
             });
         });
     });
     it('should return the first quote if passed 0 after callback', function(done) {
         Quote.getQuotesFromDB(function(err , docs){
             Quote.getQuoteFromDB(function(err , doc){
                 var text1 = docs[0].text;
                 var text2 = doc.text;
                 var author1 = docs[0].author;
                 var author2 = doc.author;
                 assert.equal(text1 , text2 , "Done..");
                 assert.equal(author1 , author2 , "Done..");
                 done();
             } , 0);
         });
     });
 });
describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        request.get('/mora').expect(404,done);
     });
 
     it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {

         request.get('/api/quote')
         .expect('Content-Type', /json/)
         .end(function(err, result){
             var quote = result.body;
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
            assert.isArray(quotes, 'Done..');
             var quote = quotes[0];
             assert.property(quote, '_id');
             assert.property(quote, 'author');
             assert.property(quote, 'text');
             done();
         });
     });
 })