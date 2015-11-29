four51.app.directive('login', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/controls/login.html',
		controller: 'LoginCtrl',
	}

	return obj;

});

four51.app.directive('identifyusermessage', function() {
	var obj = {
		restrict: 'E',
		templateUrl: 'partials/messages/identifyUser.html'
	};
	return obj;
});

//
//FORCED USERNAME PREFIX
//

four51.app.directive('prefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensurePrefix(value) {
                    return 'tricor' + value;
                }
            controller.$parsers.push(ensurePrefix);
        }
    };
});