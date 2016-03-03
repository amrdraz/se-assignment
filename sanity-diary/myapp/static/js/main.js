var post = {
    "title": "Title added with JavaScript",
    "content": "This post's body text was populated with JavaScript too"
};


$('.post-load-btn').on('click', function (event) {
    $.ajax({
        url: 'api/post',
        success: function (post) {
            $('.post-list-item-header').html(post.title);
            $('.post-list-item-body').html(post.content);
        }
    });
})