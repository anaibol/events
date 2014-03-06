var FormCtrl = function ($scope, $element, Restangular) {
  $scope.ev = {};

  $scope.create = function() {
    console.log($scope.ev);

    Restangular.all('events').post($scope.ev);
  };
};