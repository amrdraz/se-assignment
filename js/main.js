// //document.querySelector('.post-list-item-header').innerHtml = "Title added with javascript";
// $('.post-list-item-header').html("Title added with JavaScript");
// $('.post-list-item-body').html("This post's body text was populated with javascript too");

// $('.post-load-btn').on('click', function (event) {
//     $('.post-list-item-header').html("Title added with JavaScript");
//     $('.post-list-item-body').html("This post's body text was populated with javascript too");
// });

var post = {
    "title": "Title added with JavaScript",
    "content": "This post's body text was populated with JavaScript too"
};

$('.button').on('click', function (event) {
    $('.post-list-item-header').html(post.title);
    $('.post-list-item-body').html(post.content);
});

// $('.button').on('click', function (event) {
//     $.ajax({
//         url: 'post.json',
//         success: function (post) {
//             $('.post-list-item-header').html(post.title);
//             $('.post-list-item-body').html(post.content);
//         }
//     });
// });

$('.button').on('click', function (event) {
    $.ajax({
        url: 'api/post',
        success: function (post) {
            $('.post-list-item-header').html(post.title);
            $('.post-list-item-body').html(post.content);
        }
    });
})