app.controller('myEventsCtrl', function($scope, moment, $http) {
  var url = document.location.pathname;
  if (url.substring(0, 1) == '/') { 
  url = url.substring(1);
}
  if (url == "")
    url = $scope.user.facebook.id;
  else
  {
    var i = 0;

    while (url[i] != '=')
      ++i;
    url = url.substring(i + 1, url.length);
  }
  $scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
    };
    $scope.updateEvents = function()
    {
      $http({url:'/import/user/'+ url, method: 'GET', params:{uid:url}}).success(function(err){
        location.reload();
      });
    };
  $http({url: '/api/' + url, method: 'GET'}).success(function(my_evs){
    $scope.events = my_evs;
    $scope.getTags();
  });
});