var EventModalCtrl = function($scope, $modalInstance, $routeParams, ev) {
	$scope.ev = ev;


	$scope.cancel = function() {
	$modalInstance.dismiss('cancel');
	};	
};