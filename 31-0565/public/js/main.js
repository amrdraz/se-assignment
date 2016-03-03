
$(document).ready(function(){

  $(document).on('click',function(event){
   $.ajax({
     url:'api/quote',
      success : function(doc){
        $('.quote').html(doc.text);
        $('.author').html(doc.author);
        document.body.style.backgroundColor = 'hsl(' + (Math.random() * 360) + ', 55%, 80%)'
      }
    });
  });
});
