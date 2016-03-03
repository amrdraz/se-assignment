var mongo = require('mongodb');
var monk = require('monk');

var dataBase ;
var connect=module.exports.connect=function(cb){
	dataBase = new monk('localhost:27017/quotesDB');
	cb(dataBase);
}

var db=module.exports.db=function(){
	if (dataBase === null) throw Error('DB Object has not yet been initialized');
    return dataBase;
}

var clearDB=module.exports.clearDB = function(done){
	dataBase.get('qoutes').remove({},function(err,b){
        done();
    });
};
// exports.clearDB = function(done) {
//     dataBase.listCollections().toArray().then(function (collections) {
//         collections.forEach(function (c) {
//             dataBase.collection(c.name).removeMany();   
//         });
//         done();
//     }).catch(done);
// };




