app.controller('myEventsCtrl', function($scope, moment, $http) {
	$http.get('https://graph.facebook.com/v2.2/' + $scope.user.facebook.id + '/events?access_token=' + $scope.user.accessToken).success(function(evs){
		if (evs)
			$scope.user.my_events = evs;
		else
			$scope.user.my_events = "You are not subscribe to any events"
	});
});