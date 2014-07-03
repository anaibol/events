var EventCtrl = function($scope, $routeParams, ev) {
	$scope.ev = ev;


	$scope.cancel = function() {
	$modalInstance.dismiss('cancel');
	};	
};