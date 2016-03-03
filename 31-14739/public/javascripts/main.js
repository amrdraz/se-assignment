//alert("Hi Malak");
//window.alert("Malakk");













var colors= ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond", "Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan", "DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange", "DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet", "DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite", "Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Khaki","Lavender", "LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey", "LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow", "Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen", "MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin", "NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise", "PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown", "Salmon","SandyBrown","SeaGreen","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","SpringGreen", "SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


$(document).ready(function(){
    $('body').click(function(){    
     document.body.style.background = colors[Math.floor(Math.random()*(colors.length))];
        
        $.ajax({
        url: '/api/quote',
        success: function (post) {
            $('.quote').html(quote.text);
          //  $('.author').html(quote.author);
        }
    });
});
});
/*

$('body').click(function(){
+   $.ajax({
+       url: '/api/quote',
+       success: function(quote){
+           $('.quote').html(quote.text);
+           $('.author').html(quote.author);
+       }
+   });
+});

/*


var js = document.createElement("script");

js.type = "text/javascript";
js.src = "quotes.jason";

document.body.appendChild(js);

var s = new MySuperObject();






var msg = [
    "string one",
    "string two",
    "string three",
    "string for",
    "string five",
    "string six" /* add as many values as you want 
];

function randWithout(n, arr) {
    var res = [];
    for (var i = 0; i < arr.length; i += 1) {
        if (i !== n) {
            res.push(i);
        }
    }
    return res[Math.floor(Math.random() * (arr.length - 1))];
}


function randNumber(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return rand;
}


(function message() {
    var intro = document.getElementById("intro");
    var currNumber = randNumber(msg);
    intro.innerHTML = msg[currNumber];
    var clickNumber = randWithout(currNumber, msg);
    intro.onclick = function () {
        intro.innerHTML = msg[clickNumber];
        clickNumber = randWithout(clickNumber, msg);
    }
})()

*/