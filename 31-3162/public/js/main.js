function changeBGcolor() {
    var BGcolor = ["#FEA2D6", "#DB9BF3", "#9FD9F6", "#9FF6BC", "#EDF69F", "#F4A69D", "9DE6F4"];
    var random = BGcolor[Math.floor(Math.random() * BGcolor.length)];
    $('body').css("background", random);
}
$(function() {
    $(document).click(function() {
        $.ajax({
            url: 'api/quote',
            success: function(data) {
                var quote = data.quote;
                changeBGcolor();
                $('.quote').html(quote.text);
                $('.author').html(quote.author);
            }
        });
    });
});
