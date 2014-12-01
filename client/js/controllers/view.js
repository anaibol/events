app.controller('ViewCtrl', function($scope, $rootScope, $state, ezfb, $modal, $http, Instagram, ev, fbphoto, fbvideos) {
  // console.log(ev);
  $scope.ev = ev;
  $scope.today = new Date();
  if ($rootScope.user) {
    $http.get('/api/rsvp/' + $scope.ev.eid + '/attendings').success(function(result) {
      $scope.ev.attending = result; 
      if ($scope.ev.attending.indexOf(parseInt($rootScope.user.facebook.id)) >= 0) 
      {
        $scope.attending = 'Leave';
        $http.post('/api/rsvp/' +$scope.ev.eid + '/rsvp');
      }
      else
        $scope.attending = 'Join';
  });
  }
  else if(!$rootScope.user){
      $scope.attending= 'Join';
  }
  fbvideos.getFbVideo($scope.ev.eid).success(function(feed) {
    if (feed){
      fbvideos.getFbLink(feed, function(res){
        if (res)
          $scope.videos = res;
      });
    }
  });

  fbphoto.getFbPics($scope.ev.eid).success(function(res) {
    var pics = res.data;
    $scope.fbpics = [];
    for (var i = pics.length - 1; i >= 0; i--) {
      var pic = pics[i];

      var image = {
        url: 'https://graph.facebook.com/' + pic.id + '/picture?width=9999&height=9999',
        thumbUrl: 'https://graph.facebook.com/' + pic.id + '/picture?width=350&height=350'
      };

      $scope.fbpics.push(image);
    }
  });

  Instagram.getLocationId($scope.ev.venue.coord.lat, $scope.ev.venue.coord.lng).success(function(res) {
    if (res.data.length > 0) {
      Instagram.getPhotosByLocationId(res.data[0].id, 10).success(function(res) {
        if (res.data.length > 0) {
          $scope.instagramPhotos = [];
          for (var i = res.data.length - 1; i >= 0; i--) {
            $scope.instagramPhotos[i] = {
              url: res.data[i].images.standard_resolution.url,
              thumbUrl: res.data[i].images.low_resolution.url
            };
          }
        }
      });
    }
  });

  if ($rootScope.isMobile) {
    $http.get('/api/resolve/' + $scope.ev.eid + '/results');
  }

  $scope.promote = function(ev) {
    var modalInstance = $modal.open({
      templateUrl: 'event/promote',
      controller: 'EventPromoteCtrl',
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
});