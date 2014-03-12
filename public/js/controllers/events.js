var EventsCtrl = function($scope, $routeParams, $location, $filter, Restangular, ngTableParams, $modal, $q) {
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
    if (window.events) {
      var events = window.events;

        var styles = [];

        $scope.styles = function(column) {
              var def = $q.defer(),
                arr = [],
                styles = [];
            angular.forEach(events, function(ev){
              if (inArray(ev.query, arr) === -1) {
                arr.push(ev.query);
                styles.push({
                    'id': ev.query,
                    'title': ev.query
                });
              }
            });
            def.resolve(styles);
            return def;
        };

      angular.forEach(events, function(ev, key) {
        if (ev.venue) {
          if (ev.venue.city) ev.city = ev.venue.city;
          if (ev.venue.location) ev.location = ev.venue.location;
          if (ev.venue.country) ev.country = ev.venue.country;
          if (ev.creator) ev.creator = ev.creator.name;

          if (ev.start_time) {
            var date = new Date(ev.start_time);
            var m_names = new Array("January", "February", "March",
            "April", "May", "June", "July", "August", "September",
            "October", "November", "December");

            //ev.date = date.getDate() + ' - ' + m_names[date.getMonth()];

             ev.date = date.toUTCString();
          }

          if (!ev.members) ev.members = [];
          if (ev.members.uid) ev.members = [ev.members];
        }
      });

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

      $scope.editId = -1;

      $scope.setEditId =  function(pid) {
          $scope.editId = pid;
      }      
    } else {
      if (!jQuery.isEmptyObject($location.search())) {
        var term = Object.keys($location.search());
        term = term[0];

        var Event = Restangular.all('rest/event/finder/findNameLike?sort=start_time?name=' + term);

      } else {
        var Event = Restangular.all('events/now');
      }

      var allEvents = Event.getList().then(function(events) {
        angular.forEach(events, function(ev, key) {
          if (ev.venue) {
            if (ev.venue.city) ev.city = ev.venue.city;
            if (ev.venue.location) ev.location = ev.venue.location;
            if (ev.venue.country) ev.country = ev.venue.country;
            if (ev.creator) ev.creator = ev.creator.name;
          }
        });

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
    }
  };

  var inArray = Array.prototype.indexOf ?
          function (val, arr) {
              return arr.indexOf(val);
          } :
          function (val, arr) {
              var i = arr.length;
              while (i--) {
                  if (arr[i] === val) return i;
              }
              return -1;
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

  $scope.edit = function(ev) {
    var modalInstance = $modal.open({
      templateUrl: 'views/events/modalForm.html',
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
  };


  $scope.paginate = function(params, page) {
    jQuery('.content').animate({
      scrollTop: 0
    }, 'slow');
    params.page(page);
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
};