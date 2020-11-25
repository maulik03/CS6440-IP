angular.module('detailsPageController.module',[]).controller('detailsPageController', function($route,$routeParams,$timeout,$scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");
  $scope.user = $cookies.get("d_email");
  $scope.p_user = $routeParams.p_email;
  console.log($scope.p_user)

  // adding Blood sugar reading into database

  $scope.getpatientmeds=function(){
	$http({
		method : "POST",
			url : "/getMedicineInformation",
			data : 
			{
				"p_email" : $scope.p_user
			},
	}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.reading_data = response.data;
	}, function myError(response) {
		console.log(response);
	});
}
$scope.getpatientmeds()
$scope.statues = [
	{
		"status" : "Active",
		"new_status" : "Active"
	},
	{
		"status" : "Stop",
		"new_status" : "Stop"
	}
]
// page reload function
$scope.updmedstatus= function(status,med_name,med_info){
	console.log(status);
	$http({
		method : "POST",
			url : "/updatemedstatus",
			data : 
			{
				"p_email" : $scope.p_user,
				"med_name": med_name,
				"med_info" : med_info,
				"med_status": status
			},
	}).then(function mySuccess(response) {
	console.log(response.data)
	$scope.getpatientmeds()
	$scope.reading_data = response.data;
	}, function myError(response) {
		console.log(response);
	});
}

	$scope.logout = function(email){
		$cookies.remove("d_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
