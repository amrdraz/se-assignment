
//var functions= require("../quotes.js");
$('body').on('click', function (event) {
   // alert('sdsd');
   // $('.quote').html("Title added with JavaScript");
   // $('.author').html("This post's body text was populated with javascript too");

    //  var colorx = '#'; // hexadecimal starting symbol
    //  var letters = ['000000','FF0000','00FF00','0000FF','FFFF00','00FFFF','FF00FF','C0C0C0'];
    //         colorx += letters[Math.floor(Math.random() * letters.length)];
    //  $('.body').background-color(colorx);


      // $.get('/api/quote', function(quote){
      //  $('.body').html(quote);
    $.ajax({
     url: '/api/quote',
     success: function (post) {
        console.log(post);
        $('.quote').html(post.header);
        $('.author').html(post.content);
     }
    });
//$('body').css("background-color",'hsl('+Math.random()*360+'),55%,70%');
});



// $("h3").click(function(){
     // $.ajax({
    //     url: '/api/post',
    //     success: function (post) {

    //         $('.post-list-item-header').html(post.header);
    //         $('.post-list-item-body').html(post.body).attr("align","center");
    //     }
    // });

//     //$("h1").hide();

//     $('.post-list-item-header').html('aya');
//   $('.post-list-item-body').html('aya').attr("align","'absmiddle'");


// });
