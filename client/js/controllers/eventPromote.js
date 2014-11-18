app.controller('EventPromoteCtrl', function($scope, $modalInstance, ev, $http) {
  $scope.ev = ev;

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.submit = function()
  {
 	var end_date = new Date($scope.ev.promotion.end_date).setHours($scope.ev.promotion.end_time.getHours(), $scope.ev.promotion.end_time.getMinutes());
  	$http({
            method: 'POST',
            data: {
              eid: $scope.ev.eid,
              reward: $scope.ev.promotion.reward,
              commentary: $scope.ev.promotion.commentary,
              end_date: end_date,
              promoter: $scope.user.facebook.id
            },
            url: '/api/promote_event/' + $scope.ev.eid
          });
  	$modalInstance.dismiss('cancel');
  };
});