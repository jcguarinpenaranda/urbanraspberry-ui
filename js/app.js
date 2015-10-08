(function() {
    var app = angular.module('app', ['ngRoute', 'app-controllers', 'ui.bootstrap'])

    .config(['$routeProvider', function($routeProvider){
    	$routeProvider
    	.when('/login',{
    		templateUrl: "templates/login.html"
       	})
        .when('/admin',{
            templateUrl: "templates/admin.html",
            controller:"AdminController"
        })
        .when('/add-device',{
            templateUrl: "templates/add-device.html",
            controller:"AddDeviceController"
        })
        .when('/config',{
            templateUrl: "templates/config.html"
        })
    	.otherwise({
    		redirectTo: "/login"
    	})
    }])

    .config(['$httpProvider', function ($httpProvider) {
      // Intercept POST requests, convert to standard form encoding
      $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
        var key, result = [];

        if (typeof data === "string")
          return data;

        for (key in data) {
          if (data.hasOwnProperty(key))
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        }
        return result.join("&");
      });
    }]);

})();