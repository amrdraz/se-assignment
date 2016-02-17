
function getElementByIndexElseRandom (arr, index) {
	 index = index === undefined ? Math.floor(Math.random() * array.length) : index
	 return arr[index]
}

