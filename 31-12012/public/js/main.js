
$(document).ready(function() {

   

    $('body').on('click', function (event) {
        $.ajax({
            url: '/api/quote',
            success: function (quote) {
                $(".author").html(quote.author);
                $(".quote").html(quote.text);
            }
        });
    });

    // Populate the user table on initial page load
    // populateTable();

    // // Username link click
    // $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // // Add User button click
    // $('#btnAddUser').on('click', addUser);
    //  // Delete User link click
    // $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    // console.log(getElementByIndexElseRandom([1, 3, 4]) );
    // console.log(getElementByIndexElseRandom([1, 3, 4], 1) );

    // h( [function (){
    //     console.log('hi');
    //     var x = 1;
    //     console.log(x);
    // }, function(){
    //     console.log('hello');
    // }, function(x,y){
    //  console.log('heeey');
    //  var z=x+y; 
    //  console.log(z); 
    // }
    // ]);

});

// function h(a){
//     a[0]();
//     a[1]();
//     a[2](3,4);
// }