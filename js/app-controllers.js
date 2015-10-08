(function(){
    var app = angular.module('app-controllers', []);

    app.value('APP',{
        name:"UrbanEyes",
        api:{
            url:"api/v1/"
        },
        urls:{
            login:"#/login",
            config:"#/config",
            admin:"#/admin"
        }
    });

    /*
    The main controller is executed when
    the app loads, no matter in what route
    */
    app.controller('MainController', ['$scope','$http', 'APP',function($scope,$http,APP){

        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

    	$scope.isLoggedIn = false;
    	$scope.user = false;

        $scope.APP = APP;

    	/*
		The logout behaviour
    	*/
    	$scope.logout = function(){
            $scope.isLoggedIn = false;

            $http.post(APP.api.url+'logout/')
                .success(function(data){
                    location.href = APP.urls.login;
                })
                .error(function(e){
                    alert('Error!');
                });
    	}

    	/*
		The login behaviour
    	*/
    	$scope.login = function(password){
    		if(!$scope.isLoggedIn){
                $http.post(APP.api.url+"login/", {password:password})
                    .success(function(data){
                        if(data.status == 200){
                            $scope.user = {};
                            location.href= APP.urls.admin;
                            $scope.isLoggedIn = true;
                        }else{
                            alert("La contraseña es incorrecta.");
                        }
                    })
    		}
    	}



        /*
        Función que mira si el usuario está logueado.
        */
        $scope.checkLoginStatus = function(){
            var petition = $http.get(APP.api.url+'login/');
            return petition;
        }


        /*
        Al final se mira si el usuario está logueado y si lo está
        se le redirige a la pantalla que es.
        */
        $scope.checkLoginStatus().success(function(data){
            if(data.status == 200){
                $scope.isLoggedIn = true;
                location.href = APP.urls.admin;
            }
        })

    }]);

})();