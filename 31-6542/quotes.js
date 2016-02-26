var fs = require('fs');

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


var getQuotesFromJSON = function getQuotesFromJSON()
{
	var allQuotes = fs.readFileSync("quotes.json");
	return JSON.parse(allQuotes);
}

var getQuoteFromJSON = function getQuoteFromJSON(index)
{
	var retrievedQuotes = getQuotesFromJSON();
	return getElementByIndexElseRandom(retrievedQuotes, index);
}
console.log(getQuoteFromJSON());
