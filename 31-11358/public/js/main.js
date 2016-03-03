$(document).ready(function() {
    $('.container').css('background-color', 'rgb(127, 167, 224)');
    $('.quote').css('color', 'white');
});

$('html').click(function() {
    var r = Math.floor(Math.random() * 130 + 120);
    var g = Math.floor(Math.random() * 130 + 120);
    var b = Math.floor(Math.random() * 130 + 120);
    var s = 'rgb(' + r + ',' + g + ',' + b +')';
    $('.container').css('background-color', s);
    // $('.quote').css('color', 'rgb(255,255,255)');
    // $('.author').css('color', 'rgb(255,255,255)');

    $.ajax({url: "api/quote", success: function(result) {
        console.log(result);
        $('.quote').html(result.text);
        $('.author').html("- " + result.author);
        $('.container').css('background-color', s);
    }, error: function() {
        alert('getting quote failed, try again later');
    }})
});

$('html').keypress(function() {
    var r = Math.floor(Math.random() * 130 + 120);
    var g = Math.floor(Math.random() * 130 + 120);
    var b = Math.floor(Math.random() * 130 + 120);
    var s = 'rgb(' + r + ',' + g + ',' + b +')';
    $('.container').css('background-color', s);
    // $('.quote').css('color', 'rgb(255,255,255)');

    $.ajax({url: "api/quote", success: function(result) {
        console.log(result);
        $('.quote').html(result.text);
        $('.author').html("- " + result.author);
        $('.container').css('background-color', s);
    }, error: function() {
        alert('getting quote failed, try again later');
    }})
});
