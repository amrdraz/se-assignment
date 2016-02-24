//change the background color randomly using randomColorjs class
$(document).ready(function(){
    $("body").click(function(){
        $("body").css("background", randomColor());
    });
});
