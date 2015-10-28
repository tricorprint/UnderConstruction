four51.app.controller('CategoryCtrl', ['$routeParams', '$sce', '$scope', '$451', 'Category', 'Product', 'Nav', '$location',
function ($routeParams, $sce, $scope, $451, Category, Product, Nav, $location) {
	$scope.productLoadingIndicator = true;
	$scope.settings = {
		currentPage: 1,
		pageSize: 40
	};
	$scope.trusted = function(d){
		if(d) return $sce.trustAsHtml(d);
	}
	$scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
	$scope.subInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        angular.forEach(path,function(p){
        	if(cur_path.indexOf(p) > -1) {
	            result = true;
	        }
        });
        
        return result;
    };
    $scope.ShowSubCat = function(node){
    	if(node.ShowCat){
    		node.ShowSubCat = true;
    	}
    }

	function _search() {
		$scope.searchLoading = true;
		Product.search($routeParams.categoryInteropID, null, null, function (products, count) {
			$scope.products = products;
			$scope.productCount = count;
			$scope.productLoadingIndicator = false;
			$scope.searchLoading = false;
		}, $scope.settings.currentPage, $scope.settings.pageSize);
	}

	$scope.$watch('settings.currentPage', function(n, o) {
		if (n != o || (n == 1 && o == 1))
			_search();
	});

	if ($routeParams.categoryInteropID) {
	    $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
	        $scope.categoryLoadingIndicator = false;
        });
    }
	else if($scope.tree){
		$scope.currentCategory ={SubCategories:$scope.tree};
	}


	$scope.$on("treeComplete", function(data){
		if (!$routeParams.categoryInteropID) {
			$scope.currentCategory ={SubCategories:$scope.tree};
		}
	});


    // panel-nav
    $scope.navStatus = Nav.status;
    $scope.toggleNav = Nav.toggle;
	$scope.$watch('sort', function(s) {
		if (!s) return;
		(s.indexOf('Price') > -1) ?
			$scope.sorter = 'StandardPriceSchedule.PriceBreaks[0].Price' :
			$scope.sorter = s.replace(' DESC', "");
		$scope.direction = s.indexOf('DESC') > -1;
	});
	
	
	// SHOW BUCKETS
	function buckets() {
	    var homeurl = 'https://tricor.four51ordercloud.com/Test/catalog';
        var myurl = window.location;
	    
	    if(homeurl == myurl) {
	        document.getElementById("buckets").style.display = 'block';
        }
        else{
        }
	}
	window.setTimeout(buckets, 300);
	
	
	
	function togglecat($scope) {

	    $scope.visible = true;
	    
	    $scope.toggle = function() {
	        $scope.visible = !scope.visible;
	    };

	}
	
	

	
}]);



	

    