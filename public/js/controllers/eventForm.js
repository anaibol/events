var EventFormCtrl = function($scope, $modalInstance, ev, Restangular) {
  var events = Restangular.all('events');

  $scope.ev = ev;

  $scope.submit = function() {
    if (ev._id) {
      Restangular.all('events/' + ev._id).post($scope.ev);
    } else {
      events.post($scope.ev);
    }

    $modalInstance.close($scope.ev);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  $scope.onTimeSet = function(newDate, oldDate) {
    alert(newDate);
    alert(oldDate);
  }
};