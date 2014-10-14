Array.prototype.diff = function(a) {
  return this.filter(function(i) {
    return a.indexOf(i) < 0;
  });
};

var EventsCtrl = function($scope, $location, $modal, Global, $stateParams, $rootScope, $state, Event) {
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);

  $scope.filter = {
    sortBy: 'start_time',
    sortOrder: '1',
    since: 0,
    until: 0,
    limit: 20,
    skip: 0
  };

  var str = $location.$$path.replace('/', '');

  if ($stateParams.date) {
    $scope.filter.type = 'date';
    $scope.filter.since = new Date($stateParams.date).getTime();
  } else {
    $scope.filter.since = $scope.today.getTime();
  }

  if (str === 'me/events') {
    $scope.filter.type = 'user';
  } else if ($stateParams.user) {
    $scope.filter.type = 'user';
    $scope.filter.user = $stateParams.user;
  } else {
    if (str === 'popular') {
      $scope.filter.sortBy = 'attending_count';
      $scope.filter.sortOrder = '-1';
    }
    if (str === 'festival') {
      $scope.filter.sortBy = 'attending_count';
      $scope.filter.sortOrder = '-1';
    }
    if (str) {
      $scope.filter.type = str;
    }
  }

  $scope.getEvents = function(cb) {
    Event.findAll($scope.filter).then(function(events) {
      $scope.events = events;

      angular.forEach($scope.events, function(ev, key) {
        ev.start_time = $scope.convertToUTC(ev.start_time, ev.timezone);
        ev.end_time = $scope.convertToUTC(ev.end_time, ev.timezone);

        if (ev.imageExt) {
          ev.image = '/uploads/' + ev._id + '.' + ev.imageExt;
        } else if (ev.pic_cover) {
          if (ev.pic_cover.source) {
            ev.image = ev.pic_cover.source;
          } else {
            ev.image = null;
          }
        } else {
          ev.image = null;
        }
      });

      cb();
    });
  }

  $scope.getMore = function() {
    if (!$scope.events) return;
    $scope.filter.skip = $scope.filter.skip + $scope.filter.limit;

    Event.findAll($scope.filter).then(function(events) {
      angular.forEach(events, function(ev, key) {
        ev.start_time = $scope.convertToUTC(ev.start_time, ev.timezone);
        ev.end_time = $scope.convertToUTC(ev.end_time, ev.timezone);

        if (ev.imageExt) {
          ev.image = '/uploads/' + ev._id + '.' + ev.imageExt;
        } else if (ev.pic_cover) {
          if (ev.pic_cover.source) {
            ev.image = ev.pic_cover.source;
          } else {
            ev.image = null;
          }
        } else {
          ev.image = null;
        }
      });

      $scope.events.push.apply($scope.events, events);
    });
  }

  $scope.convertToUTC = function(date, timezone) {
    date = new Date(date);

    if (!timezone) {
      return date;
    }

    var transformed = moment(date.getTime()).tz(timezone).format("YYYY/MM/DD hh:mm A");
    transformed = new Date(transformed);

    return transformed;
  }

  $scope.getLink = function(ev) {
    return $state.current.name + '.view(ev)';
  }

  $scope.openMap = function($event, ev) {
    window.open('https://maps.google.com/maps?q=' + ev.place);
    $event.stopPropagation();
  };

  $scope.getEvents(function(cb) {});
};