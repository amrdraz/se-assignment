$('.body').on('click', function (event) {
     $.ajax({
        url: 'api/quote',
        success: function (post) {
            $('.quote').html(post.text);
            $('.author').html(post.author);
            document.body.style.backgroundColor = 'hsl('  (Math.random() * 360)  ', 55%, 80%)'
        }
    });
    
});