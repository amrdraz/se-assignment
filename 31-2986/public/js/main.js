$(document).ready(function() {

	$(document).on( "click",function() {
       
       $('body').css("background-color",getColor);
       
       $.ajax({
       		url:"http://localhost:3000/api/quote",
       		dataType: "text",
       		success:function(data){

       			var json=$.parseJSON(data);

       			$("h1").text('“'+json.text+'”');
       			
       			$("p").text('— '+json.author);

       		}

        });

    }); 

});

var getColor =function getRandomColor(){

	var colors = [
	
		'cornflowerblue',
		'aqua',
		'crimson',
		
		
		'royalblue',
		'cyan',
		'goldenyellow',
		
		'lightgray',
		'lightgreen', 
		'lightred',
		
		'salmon',
		'seagreen',
		'skyblue',
		
		'lightslategrey',
		'steelblue',
		'teal',
		
		'mint',
		'brickred',
		'mediumorchid',
		
		'goldenrod',
		'pink',
		'plum',
		
		'powderblue',
		'rosybrown',
		'violet',
		
		'silver',
		'deepskyblue',
		'slateblue',
		
		'springgreen'
	];

	return colors[Math.floor(Math.random()*colors.length)];

};




