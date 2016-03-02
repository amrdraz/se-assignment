var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("/api/quotes")
    .then(function(response) {
        $scope.quote = response.data;
    });

    $scope.click = function(){
    	$http.get("/api/quotes")
    .then(function(response) {
        $scope.quote = response.data;
    });

    }
});



$(document).ready(function(){
	alert("click anywhere to generate quotes");
    $("body").on("click", function(){

    	  var hue = 'rgb(' + (Math.floor((255)*Math.random())) + ',' + (Math.floor((255)*Math.random())) + ',' + (Math.floor((255)*Math.random())) + ')';
         $(this).css("background-color", hue);





    });

  
}); 