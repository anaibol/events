var EventCtrl = function($scope, $state, $stateParams, $modalInstance, Restangular, Global) {
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);
	
  $scope.attending = '';

  $scope.ev = {};

  $scope.getLink = function() {
    return $state.current.name.split('.')[0] + '.edit(ev)';
  }

  $scope.canEdit = function() {
    if (Global.authenticated) {
      if (window.user.admin) {
        return true;
      } else if ($scope.ev.creator) {
        if ($scope.ev.creator.uid === window.user.facebook.id) {
          return true;
        }
      }
    }
  }

  Events.one($stateParams.eid).then(function(ev) {
    // Events.one(ev.eid).get('rsvp').then(function(res) {
    //   $scope.attending = true;
    // });

    $scope.ev = ev;

    if (Global.authenticated) {
      if ($scope.ev.attending.indexOf(window.user.facebook.id) > 0) {
        $scope.attending = 'attending';
      }
    
      Restangular.all('events/' + ev.eid).get('userStatus').then(function(result) {
        $scope.ev.attending = result;

        if ($scope.ev.attending.indexOf(window.user.facebook.id) > 0) {
          $scope.attending = 'attending';
        } else {
          $scope.attending = 'declined';
        }
      });
    }

    // var rsvp = Events.one(ev.eid);

    // Restangular.one('events', ev.eid)

    $scope.setAttending = function (eid) {
      Restangular.all('events/' + ev.eid + '/rsvp').post({attendingStatus: 'attending'}).then(function(res) {
        $scope.attending = 'attending';
      });
    }

    $scope.setNotAttending = function (eid) {
      Restangular.all('events/' + ev.eid + '/rsvp').post({attendingStatus: 'declined'}).then(function(res) {
        $scope.attending = 'declined';
      });
    }

    $scope.sendInvitations = function (eid) {
      Restangular.all('invite/' + ev.eid + '/100004646590264').post().then(function(res) {
      });
    }

    $scope.shareEvent = function (eid) {
      Restangular.all('share/' + ev.eid ).post().then(function(res) {
      });
    }

  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};