(function(){
    var app = angular.module('app-controllers', []);

    /*
    The main controller is executed when
    the app loads, no matter in what route
    */
    app.controller('MainController', ['$scope',function($scope){

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

    		}
    	}

    }]);

})();