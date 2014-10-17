app.controller('IndexCtrl', function($scope, Global, $state) {
	$scope.global = Global;
	Global.$state = $state;
});