app.controller('EventPromoteCtrl', function($scope, $modalInstance, ev, $http, $templateCache) {
  $scope.ev = ev;
  $scope.ismeridian = true;
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
  $scope.submit = function()
  {
  if ($scope.ev.promotion.end_time)
  {
 	  var end_date = new Date($scope.ev.promotion.end_date).setHours($scope.ev.promotion.end_time.getHours(), $scope.ev.promotion.end_time.getMinutes());
  }
  	$http({
            method: 'POST',
            data: {
              eid: $scope.ev.eid,
              reward: $scope.ev.promotion.reward,
              commentary: $scope.ev.promotion.commentary,
              end_date: end_date,
              promoter: $scope.user.facebook.id,
              quantity: $scope.ev.promotion.quantity,
              value: $scope.ev.promotion.value,
            },
            url: '/api/promote_event/' + $scope.ev.eid
          }).success(function(){
              ev.promoted = true;
          });
  $modalInstance.close($scope.ev.promotion);  
  };
});