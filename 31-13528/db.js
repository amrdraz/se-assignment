var mongo=require('mongodb').MongoClient;
var DB=null;
var dbURL='mongodb://localhost:27017/quotes';
exports.connect=function(callback){
	mongo.connect(dbURL,function(err,db){
	if(err)
		console.log("could not connect");
	else {
		console.log("connected to "+dbURL);
		DB=db;
		callback(err,DB);

	}
});

}
exports.db=function () {
    return DB;
  }

exports.clearDB = function(done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
}
