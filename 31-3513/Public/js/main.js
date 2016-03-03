
 	var $quote = document.querySelector('.quote');
var $author = document.querySelector('.author');
document.getElementById("p1").onclick = function() {
	myFunction()};

function myFunction() {
             document.getElementById("q").innerHTML =  
             $quote.innerHTML='When a person really desires something, all the universe conspires to help him realize his dream.' ;
             document.getElementById("a").innerHTML = 
             $author.innerHTML='Paulo Coelo';
             document.getElementById("p2").style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';    
        }

// var text = 'When a person really desires something, all the universe conspires to help him realize his dream.' ;

//     $('body').click(function (event) {
//     	$.ajax({
//            url: '/',
//            success: function (data){
//     $('.quote').html('hehhdd');
//     $('.author').html('ddjdjdj');
// }
// });
//  });

//    $ ('body').click(function (event) {
//     $.ajax({
//         url: 'api/quote',
//         success: function (quotes) {
//             $('.quote').html(quotes.text);
//             $('.author').html(quotes.author);
//         }
//     });
//     $('body').css('backgroundColor', ('hsl(' + (Math.random()*700)+', 70% , 80%'));
// });
//     function changeBGcolor() {
//     var BGcolor = ["#FEA2D6", "#DB9BF3", "#9FD9F6", "#9FF6BC", "#EDF69F", "#F4A69D", "9DE6F4"];
//     var random = BGcolor[Math.floor(Math.random() * BGcolor.length)];
//     $('b').css("background", random);
// }
// $(function() {
//     $(document).click(function() {
//         $.ajax({
//             // url: 'api/quote',
//             // success: function(data) {
//                 // var quote = data.quote;
//                 changeBGcolor();
//                 $('.quote').html('hiiii');
//                 $('.author').html('byeee');
//             // }
//         });
//     });
// });

