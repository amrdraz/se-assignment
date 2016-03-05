var safeColors = ['00','33','66','99','cc','ff'];
var rand = function() {
    return Math.floor(Math.random()*6);
};
var randomColor = function() {
    var r = safeColors[rand()];
    var g = safeColors[rand()];
    var b = safeColors[rand()];
    return "#"+r+g+b;
};
$(document).ready(function() {
    $('html').click(function() {
        $('div').each(function() {
            $(this).css('background-color',randomColor());
        });
    });
});
$(document).click(function (){
    $.ajax({
        url: "/api/quote",
        success: function(res){
          $('.post-list-item-header').html(res.text);
          $('.author').html(res.author);
        }
    });
    $('header').css('background-color',randomColor());
})