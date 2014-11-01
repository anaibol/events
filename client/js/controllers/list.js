app.controller('ListCtrl', function($scope, $stateParams, $rootScope, $window, EventsService, $http, $querystring) {
  $scope.query = {
    since: $stateParams.since || $rootScope.today.getTime(),
    country: $stateParams.country,
    lng: ($stateParams.lng ? $stateParams.lng : $rootScope.loc.lng),
    lat: ($stateParams.lat ? $stateParams.lat : $rootScope.loc.lat),
    tags: $stateParams.tags
  };

  $scope.query = _.compactObject($scope.query);

  console.log($scope.query);

  console.time('get events');
  $http.get('/api/events?' + $querystring.toString($scope.query)).then(function(res) {
    console.timeEnd('get events');
    console.time('render list');
    $scope.events = normalizeEvents(res.data);
    $scope.getTags();
  });

  function normalizeEvents(evs) {
    for (var i = evs.length - 1; i >= 0; i--) {
      var ev = evs[i];

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

      // EventsService.set(evs[i]);
    }

    return evs;
  }

  $scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
    console.log($scope.tags);
  };

  $scope.getMore = function() {
    if (!$scope.events || $scope.noMoreEvents) return;

    if (!$scope.query.skip) {
      $scope.query.skip = 30;
    } else {
      $scope.query.skip += 30;
    }

    console.time('get more events');
    $http.get('/api/events?' + $querystring.toString($scope.query)).then(function(res) {
      console.timeEnd('get more events');

      var evs = res.data;

      if (evs.length) {
        evs = normalizeEvents(evs);

        $scope.events.push.apply($scope.events, evs);
        $scope.getTags();
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

  $scope.changeLocation = function(location) {
    alert(2);
    if (location.address_components[0].types[0] === 'country') {
      $scope.query.country = location.address_components[0].long_name.toLowerCase();
      console.log($scope.query);
      $scope.reloadEvents();
      console.log('changeLocation');
    }
  };

  $scope.changeDate = function(date) {
    alert(1);
    $scope.query.since = date.getTime();
    console.log($scope.query.since);
    $scope.reloadEvents();
    console.log('changeDate');
  };

  $scope.reloadEvents = function() {
    // console.log('reloadEvents');
    // // delete $rootScope.query.skip;
    // $scope.query = _.compactObject($scope.query);
    // $http.get('/api/events?' + $querystring.toString($scope.query)).then(function(res) {
    //   console.log(res.data.length);
    //   $scope.events = res.data;
    //   normalizeEvents();
    //   console.log($scope.events[0]);
    //   $scope.refreshTags();
    // });
  };

  // $scope.$watch('query', function() {
  //   // $scope.events = [];
  //   console.log($scope.query);
  //   // delete $rootScope.query.skip;
  //   $scope.query = _.compactObject($scope.query);
  //   // $http.get('/api/events ? ' + $querystring.toString($scope.query)).then(function(res) {
  //   //   $scope.events = res.data;
  //   // });
  // });


});