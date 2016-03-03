//var appm = require('../app.js');

$(document).ready(function () {
    $(document).on( 'click', oKappaMyKappa );
});

console.log('same');


function oKappaMyKappa()
{
  //  $('h1').text("Kpa");
 /*   $.ajax({
    	url: '/kappa',
    	type: 'GET'
    })
    .done(function() {
    	console.log("success");
    })
    .fail(function(err) {
    	console.log();
    })
    .always(function() {
    	console.log("complete");
    });
    
    $.get('app.js', function(data) {
    	console.log('kpa');
    });
*/
    $.get('/api/quote', function(data) {
    	$('#quote').text( data.text );
    	$('#author').text("- " + data.author );
    });

/*    jQuery.getScript('https://localhost:4000/kappa', function(data, textStatus) {
        data.getQuote(function(err, entry){
            if (err)
            	console.log(err);
            else
            	console.log(entry);

        },1);    
    });*/
    
}