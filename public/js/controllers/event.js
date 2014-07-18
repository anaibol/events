var EventCtrl = function($scope, $stateParams) {
	// console.log($stateParams)
  Events.one($stateParams.slug).then(function(ev) {
    $scope.ev = ev;
  });
};