angular.module('homePageController.module',[]).controller('homePageController', function($scope,$location,$http, $cookies){

  $scope.adminLoggedIn = ($cookies.get("is_admin") === "true");

  $scope.user = $cookies.get("p_email");


  $scope.getPatientInfo=function(){
  	$http({
  		method : "POST",
			url : "/getPatientInformation",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

	  $scope.reading_data = response.data;
	  $scope.patientInfo = true;
	  
	  var f_name = response.data[0].f_name;
	  document.getElementById("f_name").innerHTML = f_name;
	  var l_name = response.data[0].l_name;
	  document.getElementById("l_name").innerHTML = l_name;
	  var b_date = response.data[0].b_date;
	  document.getElementById("date").innerHTML = getAge(b_date);
	  var phoneNum = response.data[0].phone_number;
	  document.getElementById("pnumber").innerHTML = phoneNum;
	//   angular.forEach($scope.reading_data, function(item){
	// 	$scope.p_email = item.p_email; // id is in $scope.Id
	// 	$scope.f_name = item.f_name;
	// 	$scope.l_name = item.l_name;
	// 	$scope.b_date = item.b_date;
	// 	$scope.phoneNum = item.phone_number;
	// });
	  function getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		
		return age;
	  
	}

  	}, function myError(response) {
  		console.log(response);
  	});
  }

  $scope.getPatientInfo()
 //medicine function
 $scope.getMedicineInfo=function(){
  	$http({
  		method : "POST",
			url : "/getMedicineInformation",
			data :{"p_email" : $scope.user}
  	}).then(function mySuccess(response) {
      console.log(response.data)

	  $scope.reading_data = response.data;

  	}, function myError(response) {
  		console.log(response);
  	});
  } 
  $scope.getMedicineInfo()

	$scope.logout = function(email){
		$cookies.remove("p_email");
		$cookies.remove("is_admin");
		$location.path("/");
	}
});
