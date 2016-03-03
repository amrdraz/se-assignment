
$("body").click(function() 
{
    $.get("/api/quote", function(quote, resp) 
    {
    	$('body').text(quote);
        $("body").css("background", 'hsl(' + (Math.random() * 350) + ', 60%, 50%)');
   
    });
});
  

