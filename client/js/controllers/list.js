app.controller('ListCtrl', function($scope, $rootScope, $stateParams, $window, EventsService, $http, $querystring, events) {
  $scope.events = events.data;

  for (var i = $scope.events.length - 1; i >= 0; i--) {
    EventsService.set($scope.events[i]);
  }

  $rootScope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags')));

  $scope.getMore = function() {
    if (!$scope.events) return;

    if (!$rootScope.query.skip) {
      $rootScope.query.skip = 30;
    } else {
      $rootScope.query.skip += 30;
    }

    $http.get('/api/events?' + $querystring.toString($rootScope.query)).then(function(evs) {
      $scope.events.push.apply($scope.events, evs.data);
    });
  };

  $scope.openMap = function($event, ev) {
    var location = ev.location + ' ' + ev.venue.street + ' ' + ev.venue.city + ' ' + ev.venue.country;
    $window.open('https://maps.google.com/maps?q=' + location);
    $event.stopPropagation();
  };
});