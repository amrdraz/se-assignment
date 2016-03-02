
    var $quote = document.querySelector('.quote');
    var $author = document.querySelector('.author');


    function getElementByIndexElseRandom(array, index) {
        index = index === undefined ? Math.floor(Math.random() * array.length) : index;
        return array[index];
    }
    fetch('../quotes.json').then(function(res) {
        return res.json();
    }).then(function(quotes) {
        document.body.addEventListener('click', function() {
            var quote = getElementByIndexElseRandom(quotes);
            document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
            $quote.innerHTML = quote.text;
            $author.innerHTML = quote.author;
        });
    });


// // or i can do it withajax call
// $.ajax({
//       type: 'GET',
//       url: '/api/quote/'
//       }).done(function( response ) {
//         document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)';
//         $quote.innerHTML = response.text;
//        $author.innerHTML = response.author;
//     });
