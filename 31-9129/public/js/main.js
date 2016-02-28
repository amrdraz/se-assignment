var quote = $(".quote");
var author = $(".author");

$("body").click(function() 
{
    $.get("/api/quote", function(elQuote, status) 
    {
        $("body").css("background", 'hsl(' + (Math.random() * 360) + ', 55%, 70%)');
        quote.text(elQuote.text);
        author.text(elQuote.author);
    });
});
  

