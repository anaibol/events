'use strict';

angular.module('mean.events').controller('EventsController', ['$scope', '$routeParams', '$location', '$filter', 'Global', 'Restangular', 'ngTableParams',
  function($scope, $routeParams, $location, $filter, Global, Restangular, ngTableParams) {
    $scope.global = Global;

    /*Restangular.addResponseInterceptor(function(response, operation, route, url) {
      var newResponse;
      if (operation === "getList") {
        // If route is "posts" it looks for response.data.posts
        newResponse = response.payload;
        newResponse.count = response.total;
      } else if (operation === "get") {
        newResponse = response.payload[0];
        console.log(newResponse);
      } else {
        newResponse = response.data;
      }
      return newResponse;
    });*/

    $scope.find = function() {
      if (!jQuery.isEmptyObject($location.search())) {
        var term = Object.keys($location.search());
        term = term[0];

        var Event = Restangular.all('rest/event/finder/findNameLike?sort=start_time?name=' + term);

      } else {
        var Event = Restangular.all('events/now');
      }

      var allEvents = Event.getList().then(function(events) {
        $scope.tableParams = new ngTableParams({
          page: 1, // show first page
          count: 10 // count per page
        }, {
          total: events.length, // length of data
          getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.filter() ? $filter('filter')(events, params.filter()) : events;
            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
            $scope.events = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.events);
          }
        });


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
      });
    };

    /*$scope.paginate = function() {
      var Event = Restangular.all('rest/event?limit=10&skip=' + $scope.pago * 10);
      var allEvents = Event.getList().then(function(events) {
        $scope.events = events;

        angular.forEach($scope.events, function(value, key) {
          if (value.venue) {
            if (value.venue.latitude !== undefined) {
              $scope.markers.push({
                lat: value.venue.latitude,
                lng: value.venue.longitude,
                message: "My Added Marker"
              });

              $scope.$parent.pos = {
                lat: value.venue.latitude,
                lng: value.venue.longitude,
                zoom: 10
              };
            }
          }
        });
      });
    }*/

    $scope.create = function() {
      var event = new Event({
        title: this.title,
        content: this.content
      });
      event.$save(function(response) {
        $location.path('events/' + response._id);
      });

      this.title = '';
      this.content = '';
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
  }
]);