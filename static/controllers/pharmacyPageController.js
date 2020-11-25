angular.module('pharmacyPageController.module',[]).controller('pharmacyPageController', function($scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("p_email");
  


  $scope.getPharmacyList=function(){
	$http({
		method : "POST",
			url : "/getPharmacy"
	}).then(function mySuccess(response) {
	console.log(response.data)

	$scope.pharmacy_data = response.data;
	angular.forEach($scope.pharmacy_data, function(item){
		$scope.pharmid = item.pharmid; // id is in $scope.Id
		$scope.pharm_name = item.pharm_name;
	});

	}, function myError(response) {
		console.log(response);
	});
}

$scope.getPharmacyList()

$scope.selectmyPharmacy=function(){
	var data ={
		"p_email" : $scope.user,
		"id":$scope.pharmid,
		"name":$scope.pharm_name
	};
	console.log(data);
	$http({
		method : "POST",
		url : "/myPharmacy",
		data:data
			
	}).then(function mySuccess(response) {
	console.log(response.data)

	}, function myError(response) {
		console.log(response);
	});
}

$scope.selectmyPharmacy()

	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
