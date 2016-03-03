$(document).ready(function(){
    $("html").click(function(){
        $.getJSON("api/quote", function(result){
                $("h1").html(result.text);
                $("h2").html(result.author);
            });

            //generate random color
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            $("body").css("background-color", "rgb("+r+","+g+","+b+")");
        });



    }
);
