app.controller('GameCtrl', function($scope, $rootScope, $state, ezfb, $modal, $http, Instagram, ev, fbphoto, fbvideos, $templateCache, $window ) {
  $scope.ev = ev;

  $scope.descriptionOpened = false;
  if ($scope.ev.price.edited) {
    $scope.ev.price.full = $scope.ev.price.edited;
  }

  $scope.editing = false;
  $scope.today = new Date();

  if ($rootScope.user) {
    $http.get('/api/rsvp/' + $scope.ev.eid + '/attendings').success(function(result) {
      $scope.ev.attending = result; 
      if ($scope.ev.attending.indexOf(parseInt($rootScope.user.facebook.id)) >= 0) {
        $scope.attending = 'Leave';
        $http.post('/api/rsvp/' +$scope.ev.eid + '/rsvp');
      }
      else {
        $scope.attending = 'Join';
      }
    });
  } else if (!$rootScope.user) {
      $scope.attending= 'Join';
  }

  if ($rootScope.isMobile) {
    $http.get('/api/resolve/' + $scope.ev.eid + '/results');
  }


  $scope.purchase = function() {
    var handler = StripeCheckout.configure({
      key: 'pk_test_ZQr0i3Ul8GWH2G92uyByRNV9',
      image: $scope.ev.pic_cover.source,
      token: function(token) {
        // Use the token to create the charge with a server-side script.
        // You can access the token ID with `token.id`
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '1 ticket for ' + $scope.ev.name + ' (' + $scope.ev.price.full + ')',
      amount: $scope.ev.price.num * 100
    });
  };

  $scope.getCoverTopPosition = function() {
    offset_y = ev.pic_cover.offset_y;

    var cover_w = 740;
    var cover_h = 295;
    var elm =  document.querySelector('.header > img');
    var img_w = elm.offsetWidth;
    var img_h = elm.offsetHeight;
    var real_img_h = (cover_w * img_h / img_w) - cover_h;
    var top = parseInt(real_img_h * offset_y / 100);
    return ('-' + top + 'px');
  };

  $scope.coverTopPosition = $scope.getCoverTopPosition();

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
    }, function() {});
  };

  $scope.boostPlayer = function(player) {
    $http.post('/api/boost/' + $scope.ev.eid + '/' + player.uid);
    $http.post('/api/boost/update/' + $scope.ev.eid + '/' + player.uid);
  };

  $scope.inviteFriends = function(player) {
    ezfb.ui({
      method: 'apprequests',
      message: 'Invite your friends to play now.',
      data: $window.location.href
    }, function(response) {
      if (response.to)
      {
        var uids = [];
        response.to.forEach(function(uid){
          uids += uid + ',';
        });
        $http({
          method: 'POST',
          data: {
            eid: $scope.ev.eid,
            uids: uids
          },
          url: '/api/invite/' + $scope.ev.eid + '/' + uids
        });
      }
    });
  };
});
