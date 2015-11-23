four51.app.controller("ContactUsCtrl", ["$scope", "$location", "Email", function($scope, $location, Email){
    $scope.sendEmail = function(para) {
        if ($scope.email_Send.$valid && para) {
            $scope.showErrors = false;
            Email.send(para);
            para = null;
            alert('Your message has been sent!');
            $location.path('catalog');
        }

        else {
            if ($scope.email_Send.$invalid) {
                $scope.showErrors = true;

            }
        }
    }
}]);