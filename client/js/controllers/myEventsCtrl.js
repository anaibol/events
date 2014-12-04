app.controller('myEventsCtrl', function($scope, moment, $http, $stateParams) {
  $scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
    };
    $scope.updateEvents = function()
    {
      $http({url:'/import/user/'+ url, method: 'GET', params:{uid:url}}).success(function(err){
        location.reload();
      });
    };
  $http({url: '/api/me/events', method: 'GET'}).success(function(my_evs){
    $scope.events = my_evs;
    $scope.getTags();
  });
});