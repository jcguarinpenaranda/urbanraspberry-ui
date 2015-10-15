(function(){
    var app = angular.module('app-controllers', []);

    app.value('APP',{
        name:"UrbanEyes",
        api:{
            url:"api/v1/",
            urban:"../urbanraspberry/"
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


        $scope.getVariablesUrban = function(){
          return $http.get(APP.api.urban+"variables/");
        }

        /*
        Al final se mira si el usuario está logueado y si lo está
        se le redirige a la pantalla que es.
        */
        $scope.checkLoginStatus().success(function(data){
            if(data.status == 200){
                $scope.isLoggedIn = true;
                location.href = APP.urls.admin;
            }else{
              location.href=APP.urls.login;
            }
        });

        /*
        Siempre que se inicia la aplicación se llama al servicio web para obtener
        las variables activas en el servidor remoto.
        */
        $scope.getVariablesUrban().success(function(data){
          $scope.variablesUrban = data;
          console.log(data)
        }).error(function(e){
          alert('Ha ocurrido un error al cargar las variables activas en el servidor remoto');
          console.log(e)
        });

    }]);

    app.controller('AdminController',['$scope', '$http', 'APP', function($scope, $http, APP){

        function getDevices (){
            return $http.get(APP.api.urban+"equipos");
        }

        function deleteDevice (id){
          return $http.delete(APP.api.urban + "equipos/"+id);
        }

        $scope.deleteDevice = function(id){
          if(prompt("Para eliminar el dispositivo, escribe su id: "+id) === id){
            deleteDevice(id).success(function(data){
              if(data.status === 200){
                var pos;
                for(var i = 0; i<$scope.equipos.length; i++){
                  if($scope.equipos[i].id === id){
                    pos = i;
                  }
                }

                $scope.equipos.splice(pos,1);

              }
            })
          }
        }

        $scope.salvarVariable = function(pos, eqid, variable, pinesTexto){
            var pines;

            try{
              pines = pinesTexto.split(',');
            }catch(e){
              alert("Texto ingresado no es válido");
            }

            var nueva = {
                nombre:variable,
                pines:pines,
                pinesTexto:pinesTexto
            }

            $http.post(APP.api.urban+"equipos/"+eqid+"/variables", nueva)
            .success(function(data){
              if(data.status == 201){
                location.reload();
                $scope.equipos[eqid].variables.push(nueva);
              }else{
                alert("Ha ocurrido un error al guardar la variable sensada")
              }
            }).error(function(e){
              alert("Ha ocurrido un error al guardar la variable sensada")
            })

        }

        getDevices().success(function(data){
            $scope.equipos = data;
        }).error(function(e){
            alert('Ha ocurrido un error al cargar los equipos');
        })

    }]);

    app.controller('AddDeviceController', ['$scope', '$http', 'APP', function($scope, $http, APP){

        $scope.device = {
            name:"",
            id:""
        }

        $scope.save = function(){
            if($scope.device.name!="" && $scope.device.id!=""){
                $http.post(APP.api.urban+"equipos",{nombre:$scope.device.name, id: $scope.device.id})
                    .success(function(data){
                        alert(data.description);
                    })
            }
        }

    }]);


})();
