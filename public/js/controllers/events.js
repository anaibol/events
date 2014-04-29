var EventsCtrl = function($scope, $routeParams, $location, $filter, $modal, $q, Global, $window, $document) {
  $scope.today = new Date();

  $scope.filter = {
    tags: [],
    limit: 25,
    page: 1,
    sortBy: 'start_time',
    sortOrder: '1'
  };

  var str = $location.$$path.replace('/', '');

  if (str === 'popular') {
    $scope.filter.sortBy = 'attending_count';
    $scope.filter.sortOrder = '-1';
  }
  if (str) {
    $scope.filter.type = str;
  }

  Events.get($scope.filter).then(function(events) {
    $scope.events = events;
    $scope.totalEvents = events.metadata.count;
    $scope.totalPages = events.metadata.count / $scope.filter.limit;

    angular.forEach($scope.events, function(ev, key) {
      if (ev.start_time) {
        ev.date = new Date(ev.start_time);
        // var m_names = new Array("January", "February", "March",
        // "April", "May", "June", "July", "August", "September",
        // "October", "November", "December");

        //ev.date = date.getDate() + ' - ' + m_names[date.getMonth()];

         // ev.date = date.toUTCString();
      }
    });
  });

  $scope.paginate = function(page) {
    $scope.filter.page = page;

    Events.get($scope.filter).then(function(events) {
      $scope.events = events;

      var elem = $('.content');
      elem.animate({scrollTop:0}, '500', 'swing');
    });
  };


  $scope.getTags = function(column) {
    var arr = [], tags = [];

    angular.forEach($scope.events, function(ev){
      angular.forEach(ev.tags, function(tag){
        if (arr.indexOf(tag) === -1) {
          arr.push(tag);
          tags.push(tag);
        }
      });
    });

    return tags;
  };

  /*angular.forEach($scope.events, function(value, key) {
      if (value.venue) {
        if (value.venue.latitude !== undefined) {
          $scope.markers.push({
            lat: value.venue.latitude,
            lng: value.venue.longitude,
            message: value.name
          });

          $scope.$parent.pos = {
            lat: value.venue.latitude,
            lng: value.venue.longitude,
            zoom: 10
          };
        }
      }
    });*/

  $scope.open = function(ev) {
    if (Global.authenticated) {
      var modalInstance = $modal.open({
        templateUrl: 'views/events/form.html',
        controller: 'EventFormCtrl',
        resolve: {
          ev: function() {
            return ev;
          }
        }
      });

      modalInstance.result.then(function(selected) {
        $scope.ev = selected;
      }, function() {});
    }
    else {
      var modalInstance = $modal.open({
        templateUrl: 'views/events/view.html',
        controller: 'EventCtrl',
        resolve: {
          ev: function() {
            return ev;
          }
        }
      });

      modalInstance.result.then(function(selected) {
      }, function() {});      
      // $window.open('https://facebook.com/' + ev.eid);
    }
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

  $scope.findOne = function() {
    Restangular.one('rest/event', $routeParams.eventId).get().then(function(event) {
      $scope.event = event;
    }, function(response) {
      console.log("Error with status code", response.status);
    });
  };

  // $scope.newEvent = function(ev) {
  //   var modalInstance = $modal.open({
  //     templateUrl: 'views/events/form.html',
  //     controller: 'EventFormCtrl',
  //     resolve: {
  //       ev: function() {
  //         return ev;
  //       }
  //     }
  //   });

  //   modalInstance.result.then(function(selected) {
  //     $scope.ev = selected;
  //   }, function() {});
  // };

};