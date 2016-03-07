four51.app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    var concatProductView = function(routeParams){
        return 'productview.hcf?id='+ routeParams.productInteropID;
    }

    var concatSpecFormView = function(routeParams){
        return 'specform.hcf?id=' + routeParams.productInteropID;
    }

    $routeProvider.
        otherwise({redirectTo: '/UnderConstruction'});
}]);