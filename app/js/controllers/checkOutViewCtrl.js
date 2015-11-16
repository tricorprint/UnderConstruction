four51.app.controller('CheckOutViewCtrl', ['$scope', '$routeParams', '$location', '$filter', '$rootScope', '$451', 'User', 'Order', 'OrderConfig', 'FavoriteOrder', 'AddressList', 'GoogleAnalytics',
function ($scope, $routeParams, $location, $filter, $rootScope, $451, User, Order, OrderConfig, FavoriteOrder, AddressList, GoogleAnalytics) {
	$scope.errorSection = 'open';

	$scope.isEditforApproval = $routeParams.id != null && $scope.user.Permissions.contains('EditApprovalOrder');
	if ($scope.isEditforApproval) {
		Order.get($routeParams.id, function(order) {
			$scope.currentOrder = order;
		});
	}

	if (!$scope.currentOrder) {
        $location.path('catalog');
    }

	$scope.hasOrderConfig = OrderConfig.hasConfig($scope.currentOrder, $scope.user);
	$scope.checkOutSection = $scope.hasOrderConfig ? 'order' : 'shipping';

    function submitOrder() {

		$scope.showErrors = false;
		// check to make sure the form is completely valid
		if ($scope.cart_order.$valid && $scope.cart_shipping.$valid && $scope.cart_billing.$valid) {

			$scope.displayLoadingIndicator = true;
			$scope.errorMessage = null;

			Order.submit($scope.currentOrder,
				function (data) {
					if ($scope.user.Company.GoogleAnalyticsCode) {
						GoogleAnalytics.ecommerce(data, $scope.user);
					}
					$scope.user.CurrentOrderID = null;
					User.save($scope.user, function (data) {
						$scope.user = data;
						$scope.displayLoadingIndicator = false;
					});
					$scope.currentOrder = null;
					$location.path('/order/' + data.ID);
				},
				function (ex) {
					$scope.errorMessage = ex.Message;
					$scope.displayLoadingIndicator = false;
					$scope.shippingUpdatingIndicator = false;
					$scope.shippingFetchIndicator = false;
				}
			);
		}
		else {
			/*TODO: check the customfield directive - required for cart_order not working right*/
			if (!$scope.cart_order.$valid && !$scope.cart_shipping.$valid && !$scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the order, shipping, and billing sections.');
			}
			if (!$scope.cart_order.$valid && $scope.cart_shipping.$valid && !$scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the order and billing sections.');
			}
			if (!$scope.cart_order.$valid && !$scope.cart_shipping.$valid && $scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the order and shipping sections.');
			}
			if ($scope.cart_order.$valid && !$scope.cart_shipping.$valid && !$scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the shipping and billing sections.');
			}
			if ($scope.cart_order.$valid && $scope.cart_shipping.$valid && !$scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the billing section.');
			}
			if ($scope.cart_order.$valid && !$scope.cart_shipping.$valid && $scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the shipping section.');
			}
			if (!$scope.cart_order.$valid && $scope.cart_shipping.$valid && $scope.cart_billing.$valid) {
				$scope.showErrors = true;
				alert('Please complete the order section.');
			}
		}
    };

	$scope.$watch('currentOrder.CostCenter', function() {
		OrderConfig.address($scope.currentOrder, $scope.user);
	});

    function saveChanges(callback) {
	    $scope.displayLoadingIndicator = true;
	    $scope.errorMessage = null;
	    $scope.actionMessage = null;
	    var auto = $scope.currentOrder.autoID;
	    Order.save($scope.currentOrder,
	        function(data) {
		        $scope.currentOrder = data;
		        if (auto) {
			        $scope.currentOrder.autoID = true;
			        $scope.currentOrder.ExternalID = 'auto';
		        }
		        $scope.displayLoadingIndicator = false;
		        if (callback) callback($scope.currentOrder);
	            $scope.actionMessage = "Your changes have been saved";
	        },
	        function(ex) {
		        $scope.currentOrder.ExternalID = null;
		        $scope.errorMessage = ex.Message;
		        $scope.displayLoadingIndicator = false;
		        $scope.shippingUpdatingIndicator = false;
		        $scope.shippingFetchIndicator = false;
	        }
        );
    };

    $scope.continueShopping = function() {
	    if (confirm('Do you want to save changes to your order before continuing?') == true)
	        saveChanges(function() { $location.path('catalog') });
        else
		    $location.path('catalog');
    };

    $scope.cancelOrder = function() {
	    if (confirm('Are you sure you wish to cancel your order?') == true) {
		    $scope.displayLoadingIndicator = true;
	        Order.delete($scope.currentOrder,
		        function() {
		            $scope.user.CurrentOrderID = null;
		            $scope.currentOrder = null;
			        User.save($scope.user, function(data) {
				        $scope.user = data;
				        $scope.displayLoadingIndicator = false;
				        $location.path('catalog');
			        });
		        },
		        function(ex) {
			        $scope.actionMessage = ex.Message;
			        $scope.displayLoadingIndicator = false;
		        }
	        );
	    }
    };

    $scope.saveChanges = function() {
        saveChanges();
    };

    $scope.submitOrder = function() {
       submitOrder();
    };

    $scope.saveFavorite = function() {
        FavoriteOrder.save($scope.currentOrder);
    };

	$scope.cancelEdit = function() {
		$location.path('order');
	};
}]);