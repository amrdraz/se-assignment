$(document).click(function (event) {



        $.ajax({
            url: '/api/quote',

            dataType: 'json',

            success: function (data) {



                var a=data.author;
                var q=data.text;

                console.log(a);
                console.log(q);

                $('.quote').hide();
                $('.quote').html(q).slideDown();
                $('.author').hide();
                $('.author').html(a).slideDown();
                var randomColorChange = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                $('body').css('background-color', randomColorChange);


            }
        });
    });




