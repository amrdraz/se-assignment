$(document).ready(function()
{

$('body').click(function()
{
	$.ajax({
        url: 'api/quote',
        success: function (quote) {

            $('.quote_text').html(quote.text);
            
            $('.author_text').html(quote.author);
        }
    });

   //the next line is stolen from inspect element :D, sorry not sorry man :'D 
   document.body.style.background = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)' 
  

});
});