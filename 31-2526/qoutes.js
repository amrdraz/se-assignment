//var fs       = require('fs');
var database = require('./db');
var qs = require('./qoutes.json')

var getElementByIndexElseRandom= exports.getElementByIndexElseRandom = function(arr, index){
    if(index !== undefined)
        return arr[index];
    else
        return arr[Math.floor(Math.random()*arr.length)];
    }

var getQoutesFromDB = exports.getQoutesFromDB = function getQoutesFromDB(cb){
  database.db().collection("qq").find({}).toArray(function(err, qoutes) {
    cb(err, qoutes);
  });
}

exports.getQouteFromDB = function getQouteFromDB(cb, index) {
 	getQoutesFromDB(function(err, qoutes) {
 		if(err)
 			cb(err, qoutes);
 		else
 			cb(err, getElementByIndexElseRandom(qoutes, index));
 	});
 }
 function getQoutesFromJSON(){
   return qs;
 }

var getQouteFromJSON = exports.getQouteFromJSON = function getQouteFromJSON(index){
  var arr = getQoutesFromJSON();

  if(index != undefined)
    return arr[index];

  var r = getElementByIndexElseRandom(arr);
  return r;
}

exports.seed = function (cb){
		var qoutes = database.db().collection('qq');
		var all_qoutes 	= getQoutesFromJSON();
		qoutes.find({},{},function(err, docs){
			var error = err;
			var seeded = false;

			if(!docs.length){
				seeded = true;
				qoutes.insertMany(all_qoutes);
			}
			cb(error, seeded);
		});
}
// console.log(getQouteFromJSON());
exports.getQoutesFromJSON = getQoutesFromJSON;
