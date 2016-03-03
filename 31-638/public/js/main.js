console.log("Hello Worldddddddddddddd");
//var document=index.html;

    var $upperpart = document.querySelector('.quoteclass');
    var $lowerpart = document.querySelector('.authorclass');

function getElementByIndexElseRandom(array, index) {
	
	if(index === undefined) {
       this.index= Math.floor(Math.random() * array.length)
	}else{
		index;
	}
	// index = index === undefined ? Math.random() * array.length : index;
	
	return array[index]
}
	
       body.addEventListener('click', function() {


            var quote = getElementByIndexElseRandom(quotes);
            $upperpart.innerHTML = quoteclass.text;
            $lowerpart.innerHTML = quoteclass.author;
        });
  

