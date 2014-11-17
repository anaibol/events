app.controller('EventPromoteCtrl', function($scope, $modalInstance, $state, $stateParams, ev) {
  $scope.ev = ev;

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
    console.log($scope.opened);
  };


  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});