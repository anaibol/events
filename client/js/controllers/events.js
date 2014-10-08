var EventsCtrl = function($scope, $location, $modal, Global, $stateParams, $rootScope, $state, Event) {
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);

  $scope.filter = {
    sortBy: 'start_time',
    sortOrder: '1',
    since: '',
    until: '',
    limit: 30
  };

  var str = $location.$$path.replace('/', '');

  if (str === 'me/events') {
    $scope.filter.type = 'user';

    $scope.filter.since = $stateParams.date;
    $scope.filter.until = '';
  } else if ($stateParams.user) {
    $scope.filter.type = 'user';
    $scope.filter.user = $stateParams.user;

    $scope.filter.since = $stateParams.date;
    $scope.filter.toDate = '';


  } else if ($stateParams.date) {
    $scope.filter.type = 'date';

    $scope.filter.since = $stateParams.date;
    $scope.filter.toDate = '';
  } else {
    $scope.filter.since = $scope.today.getFullYear() + '-' + ($scope.today.getMonth() + 1) + '-' + $scope.today.getDate();

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

      var container = document.querySelector('.events');

      imagesLoaded(container, function(instance) {
        var myPackery = new Packery(container, {});
      });

      cb();
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

  $scope.getTags = function(column) {
    var arr = [],
      tags = [];

    angular.forEach($scope.events, function(ev) {
      angular.forEach(ev.tags, function(tag) {
        if (arr.indexOf(tag) === -1) {
          arr.push(tag);
          tags.push(tag);
        }
      });
    });

    return tags;
  };

  $scope.remove = function(event) {
    if (event) {
      event.$remove();

      for (var i in $scope.events) {
        if ($scope.events[i] === event) {
          $scope.events.splice(i, 1);
        }
      }
    } else {
      $scope.event.$remove();
      $location.path('events');
    }
  };

  $scope.update = function() {
    var event = $scope.event;
    if (!event.updated) {
      event.updated = [];
    }
    event.updated.push(new Date().getTime());

    event.$update(function() {
      $location.path('events/' + event._id);
    });
  };

  $scope.getEvents(function() {});
};