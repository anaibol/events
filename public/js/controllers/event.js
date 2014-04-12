var EventCtrl = function($scope, $modalInstance, ev) {

  if (ev) {
    $scope.ev = ev;
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};