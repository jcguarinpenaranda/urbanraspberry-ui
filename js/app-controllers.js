(function(){
    var app = angular.module('app-controllers', []);

    app.constant('APIURL','api/v1/');

    /*
    The main controller is executed when
    the app loads, no matter in what route
    */
    app.controller('MainController', ['$scope','$http','APIURL',function($scope,$http,APIURL){

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    	$scope.isLoggedIn = false;
    	$scope.user = false;

    	/*
		The logout behaviour
    	*/
    	$scope.logout = function(){
    		if($scope.user && $scope.isLoggedIn){

    		}
    	}

    	/*
		The login behaviour
    	*/
    	$scope.login = function(password){
    		if(!$scope.user && !$scope.isLoggedIn){
                $http.post(APIURL+"login/", {password:password})
                    .success(function(data){
                        if(data.status == 200){
                            $scope.user = {};
                            location.href="#/config";
                        }else{
                            alert("La contraseña es incorrecta.")
                        }
                    })
    		}
    	}

    }]);

})();