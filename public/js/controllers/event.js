var EventCtrl = function($scope, $stateParams, $modalInstance) {
	// console.log($stateParams)
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);
	
  Events.one($stateParams.slug).then(function(ev) {
    $scope.ev = ev;
  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

};