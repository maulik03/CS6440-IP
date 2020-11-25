angular.module('reportPageController.module',[]).controller('reportPageController', function($scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");

  $scope.user = $cookies.get("p_email");


  $scope.getBSReading=function(){
  	$http({
  		method : "POST",
			url : "/getBloodSugarReading",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

      $scope.reading_data = response.data;

  	}, function myError(response) {
  		console.log(response);
  	});
  }

  $scope.getBSReading()


	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
