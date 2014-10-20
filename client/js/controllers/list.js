app.controller('ListCtrl', function($scope, Global, events) {
  $scope.events = events;

  var tags = _.pluck(events, 'tags');

  tags = [].concat.apply([], tags);

  Global.tags = _.uniq(tags);

  $scope.getMore = function() {
    if (!$scope.events) return;
    Global.filter.skip = Global.filter.skip + Global.filter.limit;
    $scope.events.push.apply($scope.events, events);
  };

  $scope.openMap = function($event, ev) {
    var location = ev.location + ' ' + ev.venue.street + ' ' + ev.venue.city + ' ' + ev.venue.country;
    window.open('https://maps.google.com/maps?q=' + location);
    $event.stopPropagation();
  };
});