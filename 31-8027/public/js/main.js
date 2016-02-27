
/*$('.quote').html("Title added with JavaScript");
$('.author').html("This post's body text was populated with javascript too");
*/
var $authors= $('.author'); 
var $quotes= $('.quote');
/*

var $authors= $('.authors'); //modified more than once
var $quotes= $('.quotes');

$('.div').on('click', function (event) {
    $.ajax({
        url: '/api/quotes';
        //'../../quotes.json',
        success: function (post) {
            $authors.html(quotes.author);
            $quotes.html(quotes.text);
        }
    });
});
 /*$(function(){
    $.ajax({
      url: '/api/quote',
      type: 'GET',
      dataType: 'json',
      
      success: function (data) {
        console.log('success', data);
      },
    });
  });
*/

//$(document).ready(function(){
    $(".background").click(function(){
             
        $.ajax({ url: 'http://localhost:3000/api/quote', success: function (post) {
            console.log(post)
            $('.author').html(post[0].author);
            $('.quote').html(post[0].text);
        }

      });
        $(this).css("background",randomColor());
    });

//});


var safeColors = ["00","33","66","99","cc","ff"];
var rand = function() {
    return Math.floor(Math.random()*6);
};
var randomColor = function() {
    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};



/*$(document).ready(function()
{
 
function toggle_color(color1,color2,cycle_time,wait_time) {
setInterval(function first_color() {
    $("body").animate({
        backgroundColor: color1
    }, 1000, function () {
        setTimeout(change_color, wait_time);
    });
}, cycle_time);
 
function change_color() {
    $("body").animate({
        backgroundColor: color2
    }, 1000, function () {
        setTimeout(function () {}, wait_time);
    });
}
}
 
toggle_color('#61beb3','#7d4b68',8000,3000);
});*/

/*fetch('quotes.json').then(function(res){
    return res.json();
}).then(function(quotes){
    document.body.addEventListener('click',function(){
        var quote=""; //add a way to get quotes
        document.body.style.backgroundColor='rgb('+(Math.random()*255)+','+(Math.random()*255)+','+(Math.random()*255)+''

    })
})
*/



