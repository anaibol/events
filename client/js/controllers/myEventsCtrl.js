app.controller('myEventsCtrl', function($scope, moment, $http) {
	$scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
  	};
	$http.get('https://graph.facebook.com/v2.2/' + $scope.user.facebook.id + '/events?access_token=' + $scope.user.accessToken).success(function(evs){
		if (evs)
		{
			$scope.user.my_events = evs;
			var i = 0;
			var my_eids = "";
			while (evs.data[i])
			{
				my_eids = my_eids + evs.data[i].id + ',';
				++i;
			}
			$http({url: '/api/my_events/', method: 'GET',params:{evs: my_eids}}).success(function(my_evs){
					$scope.events = my_evs;
					$scope.getTags();
			});
		}
		else
			$scope.user.my_events = "You are not subscribe to any events"
	});
});