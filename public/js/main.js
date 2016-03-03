
$('.post-load-btn').on('click', function (event) {
    $.ajax({
        url: 'api/quote',
        success: function (post) {
            $('.post-load-btn').html(post.title);
          //  $('.post-list-item-body').html(post.content);
        }
    });
})
$.getJSON('/functions.php', { get_param: 'value' }, function(data) {
    $.each(data, function(index, element) {
        $('body').append($('<div>', {
            text: element.name
        }));
    });
});