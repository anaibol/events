'use strict';

app.controller('HeaderCtrl', function ($scope, $rootScope, Global, $modal) {
  $scope.global = Global;
  $scope.isCollapsed = true;

  $scope.newEvent = function(ev) {
    var modalInstance = $modal.open({
      templateUrl: 'views/events/form.html',
      controller: 'EventFormCtrl',
      resolve: {
        ev: function() {
          return ev;
        }
      }
    });

    modalInstance.result.then(function(selected) {
      $scope.ev = selected;
    }, function() {});
  };
});