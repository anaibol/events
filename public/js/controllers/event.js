var EventCtrl = function($scope, $stateParams, $modalInstance, Restangular) {
	// console.log($stateParams)
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);
	
  $scope.attending = true;

  Events.one($stateParams.eid).then(function(ev) {
    // Events.one(ev.eid).get('rsvp').then(function(res) {
    //   $scope.attending = true;
    // });

    Restangular.all('events/' + ev.eid + '/rsvp').get('rsvp').then(function(res) {
      $scope.attending = res;
    });



    $scope.ev = ev;

    // var rsvp = Events.one(ev.eid);

    // Restangular.one('events', ev.eid)

    $scope.setAttending = function (eid) {
      // console.log(Restangular.all('events/' + ev.eid + '/rsvp').post);
      Restangular.all('events/' + ev.eid + '/rsvp').post({attendingStatus: 'attending'}).then(function(res) {
        $scope.attending = '';
      });

      // Restangular.all('events/' + ev.eid + '/rsvp');
    }

    $scope.setNotAttending = function (eid) {
      // console.log(Restangular.all('events/' + ev.eid + '/rsvp').post);
      Restangular.all('events/' + ev.eid + '/rsvp').post({attendingStatus: 'declined'}).then(function(res) {
        console.log(res);
      });

      // Restangular.all('events/' + ev.eid + '/rsvp');
    }

    'not attending'

  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};