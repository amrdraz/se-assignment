var post = {
    "title": "Title added with JavaScript",
    "content": "This post's body text was populated with JavaScript too"
};

$('.post-load-btn').on('click', function (event) {
    $('.post-list-item-header').html(post.title);
    $('.post-list-item-body').html(post.content);
});

$('html').click(function() {
//Hide the menus if visible
});

$('#menucontainer').click(function(event){
    event.stopPropagation();
});