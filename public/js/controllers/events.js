'use strict';

angular.module('mean.events').controller('EventsController', ['$scope', '$routeParams', '$location', 'Global', 'Restangular',
  function($scope, $routeParams, $location, Global, Restangular) {
    $scope.global = Global;

    Restangular.addResponseInterceptor(function(response, operation, route, url) {
      var newResponse;
      if (operation === "getList") {
        // If route is "posts" it looks for response.data.posts
        newResponse = response.payload;
        newResponse.count = response.total;
      } else {
        newResponse = response.data;
      }
      return newResponse;
    });

    $scope.find = function() {
      if (!jQuery.isEmptyObject($location.search())) {
        var term = Object.keys($location.search());
        term = term[0];

        var Event = Restangular.all('rest/event/finder/findNameLike?name=' + term);
      } else {
        var Event = Restangular.all('rest/event');
      }

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
    }

    $scope.paginate = function() {
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
    }

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
      $scope.event = Event.findOne({
        eventId: $routeParams.eventId
      }, function(err, event) {
        console.log(event);
      });
    };
  }
]);