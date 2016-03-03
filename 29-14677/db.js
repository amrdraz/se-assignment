
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'localhost:27017/MyDatabase';

var connect = module.exports.connect = function connect(cb) {

var monk = require('monk');
var DB = monk(dbURL);
cb(DB);
}

var db = module.exports.db  = function() {
    if (DB == null){
   connect(function(db){
		DB = db;

		});
   return DB;
}

else{
	return DB

}
};

var clearDB = module.exports.clearDB = function(done , flag) {
  var collection = DB.get('quotes');
var flag = false ;
       if (DB == null){
   connect(function(db){
    DB = db;
    });
   }
if(DB.get('quotes') != 0 ){
  flage = false ;
}else {
flag  = true ;

}
  console.log(collection.find() );

    collection.drop();

      console.log(collection );
      done(null ,flag);



};
