 function getElementByIndexElseRandom(array , indx){
   var s = 'Test the indx : '.concat(indx);
   console.log(s);
   var sz = array.length;
   if(indx<0 || indx >=sz) return -1;
   return array[indx];

}
function getElementByIndexElseRandom(array){
  var sz = array.length;
  return array[parseInt(Math.random()*sz)];
}
