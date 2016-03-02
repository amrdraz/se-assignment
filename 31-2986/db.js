var mongo = require('mongodb');
var dbURL = 'mongodb://localhost:27017/inspire-me';
var Server = mongo.Server;
var assert =require('assert')
Db = mongo.Db;


var server = new Server('localhost', 27017, {auto_reconnect: true});
var DB = new Db('inspire-me', server);


var connect = function(cb) {

     cb(null,DB)
   
    };

connect( function(err, db) {
            
    assert.equal(null, err);
        db = DB;
           
    });



exports.db = function() {

    if (DB === null) throw Error('DB Object has not yet been initialized');
        
        return DB;

};




exports.clearDB = function(done) {

    DB.listCollections().toArray().then(function (collections) {
        
        collections.forEach(function (c) {
        
            DB.collection(c.name).removeMany(); 
        
        });
        
        done();
   
    }).catch(done);
};

exports.connect = connect;
exports.DB=DB;
