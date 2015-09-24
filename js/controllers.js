(function() {
    var app = angular.module('owapp', ['ngRoute', 'owapp-directives']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                    .when('/', {
                        templateUrl: "partials/indexinfo.html"
                    })
                    .when('/contact/', {
                        templateUrl: "partials/indexinfo.html"
                    })
                    .when('/us/', {
                        templateUrl: "partials/nosotros.html"
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            ;
        }]);


    app.controller('appController', [function() {
            var cont = this;

            cont.clientes = [
            {
                nombre :"GPA SAS",
                ubicacion :"COLOMBIA",
                url: "http://www.gpasas.com"
            },
            {
                nombre :"JS International Trading",
                ubicacion :"USA",
                url: "http://www.jsinttrading.com"
            },
            {
                nombre :"Chemicorp",
                ubicacion :"USA",
                url: "http://www.chemicorp.com"
            },
            {
                nombre :"Belleza Express",
                ubicacion :"COLOMBIA",
                url: "http://www.chemicorp.com"
            },
            {
                nombre :"Central de Hidráulicos",
                ubicacion :"COLOMBIA",
                url: "No disponible"
            }
            ]

            cont.proyectos=[
            {
                nombre :"Las Casas 3d",
                url: "http://lascasas3d.com",
                descripcion: "Plataforma web y móvil para recorrer virtualmente proyectos inmobiliarios en el mundo de manera fácil y rápida"
            },
            {
                nombre: "Rapifilas",
                url:"http://www.rapifilas.com",
                descripcion: "Plataforma web y móvil que permite a las personas ahorrar tiempo en los restaurantes, conciertos, eventos, y gran cantidad de locales. Entra, seguro te va a servir"
            },
            {
                nombre: "Mis tarjetas",
                url:"#",
                descripcion: "Aplicacion web y móvil que permite que difundas tu tarjeta personal de trabajo con el mundo entero"
            },
            {
                nombre: "Polla Millonaria",
                url:"http://otherwise-studios.com/pollamillonaria",
                descripcion: "Aplicacion web responsive que permite jugar la tradicional polla mundialista por medio de internet de manera fácil y segura "
            }
            ]

            cont.trabajadores=[
            {
                nombre: "Juan Camilo Guarín Peñaranda",
                descripcion: "Fundador y desarrollador. Estudiante de Ingeniería Multimedia de la Universidad Autónoma de Occidente.",
                correo: "gerencia@otherwise-studios.com"
            },
            {
                nombre: "Juan Camilo Vergara Londoño",
                descripcion: "Director de Ventas y Mercadeo. Estudiante de Mercadeo y Publicidad de la Universidad Icesi.",
                correo: "ventas@lascasas3d.com"
            }
            ]

        }])

})();