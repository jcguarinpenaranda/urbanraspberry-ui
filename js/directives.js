(function() {
    var app = angular.module('owapp-directives', []);

    app.directive('menugpa', function() {
        return{
            restrict: 'E',
            templateUrl: "partials/menu.html"
        };
    });

    app.directive('contactogpa', function() {
        return{
            restrict: 'E',
            templateUrl: "partials/modals/contacto.html"
        };
    });

})();

