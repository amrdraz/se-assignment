

var getElementByIndexElseRandom = function getElementByIndexElseRandom(array , index)
{
		if(index === undefined)
		{
			var l = array.length;
			var randomN = Math.floor(Math.random() * l);
			return array[randomN];
		}
    		
    	else
    		return array[index];
}

var x = getElementByIndexElseRandom([1, 3, 4], 0) ;
var y = getElementByIndexElseRandom([1, 3, 4]) ;
console.log(x);
console.log(y);
