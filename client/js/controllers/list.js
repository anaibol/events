app.controller('ListCtrl', function($scope, $rootScope, $window, EventsService, $http, $querystring, events) {
  console.timeEnd('get events');
  console.time('render list');
  $rootScope.events = events.data;

  $scope.normalizeEvents = function() {
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
  };

  $scope.refreshTags = function() {
    $rootScope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
  };

  $scope.getMore = function() {
    if (!$scope.events || $scope.noMoreEvents) return;

    if (!$rootScope.query.skip) {
      $rootScope.query.skip = 30;
    } else {
      $rootScope.query.skip += 30;
    }

    console.time('get more events');
    $http.get('/api/events?' + $querystring.toString($rootScope.query)).then(function(evs) {
      console.timeEnd('get more events');

      if (evs.data.length) {
        $scope.events.push.apply($scope.events, evs.data);
      } else {
        $scope.noMoreEvents = true;
      }
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

  $rootScope.changeLocation = function(location) {
    if (location.address_components[0].types[0] === 'country') {
      $rootScope.query.country = location.address_components[0].long_name;
      console.log($rootScope.query);
      $scope.reloadEvents();
    }
  };

  $rootScope.changeDate = function(date) {
    $rootScope.query.since = date.getTime();
    console.log($rootScope.query.since);
    $scope.reloadEvents();
  };

  $scope.reloadEvents = function() {
    // delete $rootScope.query.skip;
    $rootScope.query = _.compactObject($rootScope.query);
    $http.get('/api/events?' + $querystring.toString($rootScope.query)).then(function(res) {
      console.log(res.data.length);
      $scope.events = res.data;
      $scope.normalizeEvents();
      console.log($scope.events[0]);
      $scope.refreshTags();
    });
  };

});