var HeaderCtrl = function($scope, $rootScope, Global, $location, $modal) {
	$scope.global = Global;

	$scope.isCollapsed = true;

	$scope.changeDate = function(date) {
		date = getStringDate(date);
		$location.url('/date/' + date);
	}

	function getStringDate(aDate) {
		var dd = aDate;
		var yy = dd.getYear();
		var mm = dd.getMonth() + 1;
		dd = dd.getDate();
		if (yy < 2000) {
			yy += 1900;
		}
		if (mm < 10) {
			mm = "0" + mm;
		}
		if (dd < 10) {
			dd = "0" + dd;
		}
		var rs = yy + "-" + mm + "-" + dd;
		return rs;
	}

	$scope.newEvent = function(ev) {
		var modalInstance = $modal.open({
			templateUrl: '/views/events/form.html',
			controller: 'EventFormCtrl',
			resolve: {
				ev: function() {
					return ev;
				}
			}
		});

		modalInstance.result.then(function(selected) {
			$scope.ev = selected;
		}, function() {});
	};
};