$('.post-load-btn').on('click', function (event) {
    $.ajax({
        url: 'api/post',
        success: function (post) {
            $('.post-list-item-header').html(post.title);
            $('.post-list-item-body').html(post.content);
        }
    });
})