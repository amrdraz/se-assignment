// Colours array
var colours = ["#789dd0", "#a2b3cc", "#9da1b6", "#7f7784", "#a69190", "#bf7fbf", "#a3d468", "#9aacb0", "##294d67", "#88d2f6", "#5df977", "#b4fb38", "#ffaaaa"];
var index = 0;

$(document).ready(function() {

  // Animates "Click something."
  $('h2').typeIt();

  $(document).on("click", function() {

    $('h1').css("font-size", "50px");

    // Updates background colour
    $("body").css({
      "background-color": colours[index]
    });

    if (index === colours.length - 1)
      index = 0;
    else
      index++;

    // Francis GET request
    $.ajax({

      url: "http://localhost:3000/api/quote",
      dataType: "text",
      success: function(data) {

        var json = $.parseJSON(data);

        // Updates HTML elements
        $("h1").text('“' + json.text + '”');
        $("h2").text(json.author);

        // Animates author name
        $('h2').typeIt();

      }

    });

  });

});
