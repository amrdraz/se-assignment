$(function() {
	$(document).click(function() {
  		$.ajax({
    		url: 'api/quote',
    		success: function (quote) {
        		$('.quote-title').html("\"" + quote[0].text + ".\"");
        		$('.post-list-item-body').html("-" + quote[0].author);
                var colors = ["Assets/congruent_pentagon.png", "Assets/green_dust_scratch.png", "Assets/ice_age.png", 
                "Assets/pink_rice.png", "Assets/restaurant.png", 
                "Assets/retina_wood.png", "Assets/symphony.png", "Assets/food.png", "Assets/mirrored_squares.png", "Assets/paisley.png", "Assets/skulls.png"];
                var index = 0;
                for(i=0;i<colors.length;i++){
                    if($(document.body).css('background-image') == 'url(\"' + window.location.href + colors[i] + '\")'){
                        index = i;
                    }
                }
                colors.splice(index, 1);
                var rand = colors[Math.floor(Math.random() * colors.length)];
                $(document.body).css('background-image', 'url(../' + rand +')');
    		}
		});
	});
});

