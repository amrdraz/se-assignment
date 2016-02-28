$(document).ready(function()
{
    $("div").mouseenter(function()
    {
        $("div").fadeTo('fast',0.5);
    });
    $("div").mouseleave(function()
    {
        $("div").fadeTo('fast',1);
    });
    $("div").click(function()
    {
    	
        $.ajax({
        url: 'api/quote',
        success: function (quote) {

            $('div').html(quote.text);
            $('#author').html(quote.author);
        }
        
    });
    });
    
});