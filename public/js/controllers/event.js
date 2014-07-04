var EventCtrl = function($scope, $routeParams) {
  Events.one($routeParams.slug).then(function(ev) {
    $scope.ev = ev;
  });
};