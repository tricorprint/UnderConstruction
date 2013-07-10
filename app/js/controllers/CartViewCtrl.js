
four51.app.controller('CartViewCtrl', function ($scope, $location, $451, OrderService, UserService) {
    $scope.checkout = function() {
        console.log('checkout');
    };
    $scope.cancelOrder = function() {
        OrderService.delete($scope.order, function() {
            UserService.current.CurrentOrderID = null;
            $location.path('#/catalog');
        });
    };
    $scope.loadCart = function() {
        var currentOrderID = UserService.current.CurrentOrderID;
        $scope.order = currentOrderID != null ? OrderService.get({ id: currentOrderID }) : null;
    }
});