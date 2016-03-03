$(document).ready(function () {
    function backgroundC() {
      var back = ["#7FFFD4","#A52A2A" , "#8FBC8F", "#2F4F4F", "#48D1CC"];
        var rand = back[Math.floor(Math.random() * back.length)];
        $('body').css('background',rand);
    }
    

    function changeText() {
        $.ajax({
        url: 'api/quote',
        datatype: 'json',
        success: function (post) {
            $('.quote').html(post.text);
            $('.author').html(post.author);
        }
    });
     }


    
        
    $(document.body).click(function(e){
      
      backgroundC();
      changeText();
   


    });



    $(".body").click(function(e){
      e.stopPropagation();
    });
  });
