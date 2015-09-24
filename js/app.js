(function() {
    var app = angular.module('app', ['ngRoute', 'app-controllers'])

    .config(['$routeProvider', function($routeProvider){
    	$routeProvider
    	.when('/login-register',{
    		templateUrl: "templates/login-register.html"
       	})
    	.otherwise({
    		redirectTo: "/login-register"
    	})
    }]);

})();