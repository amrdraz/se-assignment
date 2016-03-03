var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');

$(document).on('click', function (event) {
    $.ajax({
    	url: 'api/quote',
    	dataType: 'json',
    	success: function (data){

    		$('.quote').html(data.text);
    		$('.author').html(data.author);
    		document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 20%, 20%)'

    	}
    });


    //$('.quote').html("Mat-hazarsh");
    //$('.author').html("M.Shokr");
    // document.body.style.backgroundColor = 'rgb('+ (Math.randon()*100) +',' + (Math.randon()*100) +',' + (Math.randon()*100) +')'
     //document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 20%, 20%)'
 });