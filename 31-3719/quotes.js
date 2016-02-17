var ob = require("../quotes.json")

function getElementByIndexElseRandom (arr, index) {
	 index = index === undefined ? Math.floor(Math.random() * arr.length) : index
	 return arr[index]
}

function getQuotesFromJSON() {
	return ob	
}

function getQuoteFromJSON(index) {
	return getElementByIndexElseRandom(getQuotesFromJSON(), index)
}


