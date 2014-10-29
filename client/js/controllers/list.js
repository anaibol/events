app.controller('ListCtrl', function($scope, $rootScope, $window, EventsService, $http, $querystring, events) {
  $scope.events = events.data;

  for (var i = $scope.events.length - 1; i >= 0; i--) {
    var ev = $scope.events[i];

    if (ev.attending_count >= 50) {
      ev.tags.push('popular');
    }

    if (ev.price.num === 0) {
      ev.tags.push('free');
    }

    if (ev.festival) {
      ev.tags.push('festival');
    }

    ev.tags = _.uniq(ev.tags);

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

  $scope.openTag = function($event, ev) {

    $event.stopPropagation();
  };
});