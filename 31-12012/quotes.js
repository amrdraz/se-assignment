var fs = require('fs');
var DB = require('./db.js');
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;

var dbURL = 'mongodb://localhost:27017/inspire-me';



// Functions =============================================================

module.exports.getElementByIndexElseRandom = function(array , index){

    if(typeof index !== 'undefined' && index<array.length)
        return array[index];

    var i =  parseInt(Math.random()*array.length, 10);
    return array[i];

}

module.exports.getQuotesFromJSON =function(){
    return JSON.parse(fs.readFileSync('../quotes.json', 'utf8'));
 }


module.exports.getQuotesFromJSON2 = function(index){
    var array = module.exports.getQuotesFromJSON();
    if(typeof index !== 'undefined' && index<array.length){
        return array[index];
    }
    var i = parseInt(Math.random()*array.length);
    return array[i];
}

module.exports.seed = function seed(cb) {
    var array = module.exports.getQuotesFromJSON();

    DB.db().collection('quotes').count(function(err, count){
      assert.equal(err, null);
         if(count == 0){
            DB.db().collection('quotes').insert(array, function(err2, result) {
                assert.equal(null, err2);
                cb(err2, true);
            });
        } else {
            cb(err, false);
        }
    });

    // 
}





  //module.exports.getQuotesFromDB= function getQuotesFromDB(cb){
   // If an error occurred, handle it (throw, propagate, etc)
   // if(err) {
   //   console.log('Unknown Error');
   //   return;
   // }

module.exports.getQuotesFromDB = function(callback) {
    DB.db().collection('quotes').find({}).toArray(function(err, quotes){
        callback(err, quotes);
    });
};


        // var array = module.exports.getQuotesFromJSON();
        // console.log(array);



   // // Otherwise, log the file contents
   //      return $.getJSONArray("quotes.json");

   // console.log(quotes);

 //}

 module.exports.getQuoteFromDB=function(cb , index){

// var array = module.exports.getQuotesFromDB(cb);
//       if(index && index<array.length){
//          return array[index];
//      }
//       var i = parseInt(Math.random()*array.length);
//       return array[i];

//leeh laama 7ghayert quotes li qoutes2 msln manf3sh ?
    DB.db().collection('quotes').find({}).toArray(function(err, quote){
    if (index === undefined)
 
                cb(err, quote[Math.floor(Math.floor(Math.random()*quote.length))] );
 
               else
                 cb(err, quote[index]);
        // cb(err, getElementByIndexElseRandom(arrayOfquotes , index ));
    });
  };



 







// // Fill table with data
// function populateTable() {

//     // Empty content string
//     var tableContent = '';

//     // jQuery AJAX call for JSON
//     $.getJSON( '/users/userlist', function( data ) {

//         userListData = data;

//         // For each item in our JSON, add a table row and cells to the content string
//         $.each(data, function(){
//             tableContent += '<tr>';
//             tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
//             tableContent += '<td>' + this.email + '</td>';
//             tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
//             tableContent += '</tr>';
//         });

//         // Inject the whole content string into our existing HTML table
//         $('#userList table tbody').html(tableContent);
//     });
// };

// // Show User Info
// function showUserInfo(event) {

//     // Prevent Link from Firing
//     event.preventDefault();

//     // Retrieve username from link rel attribute
//     var thisUserName = $(this).attr('rel');

//     // Get Index of object based on id value
//     var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

//     // Get our User Object
//     var thisUserObject = userListData[arrayPosition];

//     //Populate Info Box
//     $('#userInfoName').text(thisUserObject.fullname);
//     $('#userInfoAge').text(thisUserObject.age);
//     $('#userInfoGender').text(thisUserObject.gender);
//     $('#userInfoLocation').text(thisUserObject.location);


// };

// // Delete User
// function deleteUser(event) {

//     event.preventDefault();

//     // Pop up a confirmation dialog
//     var confirmation = confirm('Are you sure you want to delete this user?');

//     // Check and make sure the user confirmed
//     if (confirmation === true) {

//         // If they did, do our delete
//         $.ajax({
//             type: 'DELETE',
//             url: '/users/deleteuser/' + $(this).attr('rel')
//         }).done(function( response ) {

//             // Check for a successful (blank) response
//             if (response.msg === '') {
//             }
//             else {
//                 alert('Error: ' + response.msg);
//             }

//             // Update the table
//             populateTable();

//         });

//     }
//     else {

//         // If they said no to the confirm, do nothing
//         return false;

//     }

// };
