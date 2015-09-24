(function(){
    var app = angular.module('app-controllers', []);

    app.constant('APIURL','api/v1/');

    /*
    The main controller is executed when
    the app loads, no matter in what route
    */
    app.controller('MainController', ['$scope','$http','APIURL',function($scope,$http,APIURL){

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
    	$scope.login = function(username,password){
    		if(!$scope.user && !$scope.isLoggedIn){

    		}
    	}

    	/*
		The register behaviour
    	*/
    	$scope.register = function(name, username, password){
    		if(!$scope.user && !$scope.isLoggedIn){
    			$http.post(APIURL+"register/")
    				.success(function(data){

    				})
    		}
    	}

    }]);

})();