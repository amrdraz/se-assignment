	$('body').click(function(){
		$.ajax({url: "api/quote", success: function(result){
				var letters = '0123456789ABCDEF'.split('');
    			var color = '#';
    			for (var i = 0; i < 6; i++ ) {
        			color += letters[Math.floor(Math.random() * 16)];
    			}
    			document.body.style.backgroundColor = color;
				$('#title').html(result.text);
		        $('#author').html('-'+result.author);
    	}});
		console.log("asdas");
		
	});