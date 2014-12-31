app.controller('ListCtrl', function($scope, $window, Event, evs) {
  if (!evs.length) {
    evs.noev = "No Events found!";
  }

  $scope.events = evs;
  $scope.noMoreEvents = false;
  //$scope.mobileSortList = false;
  $scope.getTags = function() {
    $scope.tags = _.uniq([].concat.apply([], _.pluck($scope.events, 'tags'))).sort();
  };

  $scope.getTags();

  $scope.getMore = function() {
    if (!$scope.events || $scope.noMoreEvents) return;

    Event.getMore().then(function(evs) {
      if (evs.length) {
        $scope.events.push.apply($scope.events, evs);
        $scope.getTags();
        var y = document.getElementById('list');
        //y.innerHTML = y.innerHTML;
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
});
