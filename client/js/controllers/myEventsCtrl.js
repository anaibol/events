app.controller('myEventsCtrl', function($scope, moment, $http) {
  var url = document.location.pathname;
  if (url.substring(0, 1) == '/') { 
  url = url.substring(1);
}
  if (url == "")
    url = $scope.user.facebook.id;
  else
    {
      var i = url.length;
      if (url[i] == '/')
        --i;
      while (url[i] != '/')
        --i;
      url = url.substring(i + 1, url.length);
    }
  $http.get('/api/user/' + url).success(function(data){
    if (data)
    {
      $http({url: '/api/me/events/' + url, method: 'GET'}).success(function(my_evs){
        if (my_evs)
        {
          $scope.events = my_evs;
          $scope.events.printmessage = "'s Live Events! " + my_evs.length + ' events';
          $scope.events.printname = data.facebook.name;
          $scope.getTags();
        }
      });
    }
  });
  $scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
    };
    $scope.updateEvents = function()
    {
      $http({url:'/import/user/'+ url, method: 'GET', params:{uid:url}}).success(function(err){
        location.reload();
      });
    };
});