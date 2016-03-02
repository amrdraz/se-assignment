var $qoute= document.querySelector('qoutes');
var $author= document.querySelector('author');
//var qoutes = response.text;
 //var author = response.author;
// $('.qoutes').html(qoutes);
//$('.author').html(author);
var color=[#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF];
$(document).ready(function{
	 document.body.addEventListener('click');
$.getJSON("/api/quote",function(data,status){
 $("body").css

 $('blockquote.qoute').html(data.text);
 $('.author').html(data.author);
 });
});
$('html').click(function() {

//document.body.style.backgroundColor= color[Math.floor((Math.random()*color.length)+1)];
 
//qoute.onClick=function();
//{
	qoute.innerHTML="qoute";
   author.innerHTML="author";
//}
//.ajax({url: "/api/quote", success: function(response){
 