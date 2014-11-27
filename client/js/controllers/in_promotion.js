app.controller('inPromotionCtrl', function($scope, moment, $http) {
	$scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
  	};
	$http({url: '/api/my_events/in_promotion', method: 'GET'}).success(function(my_evs){
		$scope.events = my_evs;
		$scope.getTags();
	});
});
