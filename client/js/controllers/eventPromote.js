app.controller('EventPromoteCtrl', function($scope, $modalInstance, $state, $stateParams, ev) {
  $scope.ev = ev;

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };  
});