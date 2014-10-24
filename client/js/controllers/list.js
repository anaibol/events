app.controller('ListCtrl', function($scope, $rootScope, events) {
  $scope.events = events;

  $rootScope.tags = _.uniq([].concat.apply([], _.pluck(events, 'tags')));

  $scope.getMore = function() {
    if (!$scope.events) return;
    $rootScope.filter.skip = $rootScope.filter.skip + $rootScope.filter.limit;
    $scope.events.push.apply($scope.events, events);
  };

  $scope.openMap = function($event, ev) {
    var location = ev.location + ' ' + ev.venue.street + ' ' + ev.venue.city + ' ' + ev.venue.country;
    window.open('https://maps.google.com/maps?q=' + location);
    $event.stopPropagation();
  };
});