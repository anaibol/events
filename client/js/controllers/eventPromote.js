app.controller('EventPromoteCtrl', function($scope, $modalInstance, ev) {
  $scope.ev = ev;

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});