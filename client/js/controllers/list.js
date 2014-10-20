app.controller('ListCtrl', function($scope, events) {
  $scope.events = events;

  var tags = _.pluck($scope.events, 'tags');

  tags = [].concat.apply([], tags);

  tags = _.uniq(tags);

  console.log(tags);

  $scope.getMore = function() {
    if (!$scope.events) return;
    $scope.filter.skip = $scope.filter.skip + $scope.filter.limit;

    Event.findAll($scope.filter).then(function(events) {
      angular.forEach(events, function(ev, key) {
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
  };

  $scope.openMap = function($event, ev) {
    var location = ev.location + ' ' + ev.venue.street + ' ' + ev.venue.city + ' ' + ev.venue.country;
    window.open('https://maps.google.com/maps?q=' + location);
    $event.stopPropagation();
  };
});