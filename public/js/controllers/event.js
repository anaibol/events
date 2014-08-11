var EventCtrl = function($scope, $stateParams, $modalInstance, Restangular, Global) {
	// console.log($stateParams)
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);
	
  $scope.attending = '';

  Events.one($stateParams.eid).then(function(ev) {
    // Events.one(ev.eid).get('rsvp').then(function(res) {
    //   $scope.attending = true;
    // });

    $scope.ev = ev;

    if (Global.authenticated) {
      Restangular.all('events/' + ev.eid).get('userStatus').then(function(result) {
        $scope.attending = result.rsvp_status;
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
  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};