
$(document).ready(function(){

    $('body').click(function(){
        $.ajax(
            {
                type:'GET',
                url:'/api/quote',
                success:function(data){
                    $('#quote').html(data.text);
                    $('#author').html(data.author);

                }

            }
        );
        document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';

    })

});

