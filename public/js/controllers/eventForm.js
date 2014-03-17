var EventFormCtrl = function($scope, $modalInstance, ev, Restangular) {
  $scope.result = '';

  $scope.form = {
    type: 'geocode',
    bounds: {SWLat: 49, SWLng: -97, NELat: 50, NELng: -96},
    country: 'ca',
    typesEnabled: false,
    boundsEnabled: false,
    componentEnabled: false,
    watchEnter: true
  };

  var events = Restangular.all('events');

  if (ev) {
    $scope.ev = ev;
  }
  else {
    $scope.ev = {};
  }

  $scope.submit = function() {
    if ($scope.ev._id) {
      Restangular.all('events/' + $scope.ev._id).post($scope.ev).then(function(res) {
          $scope.ev._id = res._id;
          events.push($scope.ev);
          $modalInstance.close($scope.ev);
      });
    } else {
      Restangular.all('events/').post($scope.ev).then(function(res) {
          $scope.ev._id = res._id;
          $scope.$parent.events.push($scope.ev);
          $modalInstance.close($scope.ev);
      });
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};