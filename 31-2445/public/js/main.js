var imported = document.createElement("script");
imported.src = "31-2445/quotes.js";
document.getElementsByTagName("head")[0].appendChild(imported);


function first() { alert("first"); }
$(document).ready(function() {
   $(function() {

  var colors = ['red', 'blue', 'green', 'grey','pink','yellow','purple','black'],
    color;

  $(this).click(function() {
    var randColor;
    do {
      randColor = colors[Math.floor(Math.random() * colors.length)];
    } while (color == randColor);
    $('body').css('background-color', randColor);
    color = randColor;
    var index = Math.floor(Math.random()*100+10);

    $.ajax({url: '/api/quote', success: function(quote){
        $("h1").html(quote.text);
        $("p").html(quote.author);
  }
});
});
});
});