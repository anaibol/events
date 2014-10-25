app.controller('ListCtrl', function($scope, $rootScope, $stateParams, $window, EventsService, events) {
  $scope.events = events.data;

  for (var i = $scope.events.length - 1; i >= 0; i--) {
    EventsService.set($scope.events[i]);
  }

  $rootScope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags')));

  $scope.getMore = function() {
    if (!$scope.events) return;
    $rootScope.query.skip = $rootScope.query.skip + 30;

    // Event.findAll($rootScope.query).then(function(events) {
    //   $scope.events.push.apply($scope.events, events);
    // });
  };

  $scope.openMap = function($event, ev) {
    var location = ev.location + ' ' + ev.venue.street + ' ' + ev.venue.city + ' ' + ev.venue.country;
    $window.open('https://maps.google.com/maps?q=' + location);
    $event.stopPropagation();
  };
});