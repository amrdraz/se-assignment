
var $authors= $('.author'); 
var $quotes= $('.quote');

    $(".background").click(function(){
             
        $.ajax({ url: 'http://localhost:3000/api/quote', success: function (post) {
            //console.log(post)
            $('.author').html(post[0].author);
            $('.quote').html(post[0].text);
        }

      });
        $(this).css("background",randomColor());
    });



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





