app.controller('myEventsCtrl', function($scope, moment, $http) {
	$scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
  	};
  	$scope.updateEvents = function()
  	{
  		$http.get('/import/user/' + $scope.user.facebook.id).success(function(update_evs){
  			location.reload();
  		});
  	};
	$http({url: '/api/my_events/', method: 'GET'}).success(function(my_evs){
		$scope.events = my_evs;
		$scope.getTags();
	});
});