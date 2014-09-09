var EventCtrl = function($scope, $state, $stateParams, $modalInstance, Restangular, Global) {
  $scope.today = new Date();

  $scope.today.setSeconds(0);
  $scope.today.setMinutes(0);
  $scope.today.setHours(0);
	
  $scope.attending = '';
  $scope.shared = false;

  $scope.isDisabled = false;
  $scope.btnShareText = "Share with your friends?";

  $scope.ev = {};

  $scope.boosted = 0;

  $scope.ev.players = [];

  $scope.ev.results = [];

  $scope.getLink = function() {
    return $state.current.name.split('.')[0] + '.edit(ev)';
  }

  $scope.getPromoteLink = function() {
    return $state.current.name.split('.')[0] + '.promote(ev)';
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

  $scope.addBoost = function(player_id, event_id) {
    Restangular.all('boost/' + event_id + '/' + player_id).post().then(function(res) {
        $scope.boosted = res.son_id;

        Restangular.all('results/' + player_id + '/' + event_id).get('result').then(function(player_res) {
            if (player_res == "null")
              Restangular.all('results/' + event_id).post().then(function(player_result) {
                console.log(player_result);
              });
            else {
              Restangular.all('results/update/' + event_id + '/' + player_id).post().then(function(player_result) {
                console.log(player_result);
              });
            }
        });
      });
  }

  $scope.supBoost = function(player_id, event_id) {
    Restangular.all('boost/' + event_id + '/' + player_id + "/sup").post().then(function(res) {
        $scope.boosted = 0;

        Restangular.all('results/' + player_id + '/' + event_id).get('result').then(function(player_res) {
            if (player_res == "null")
              Restangular.all('results/' + event_id).post().then(function(player_result) {
                console.log(player_result);
              });
            else {
              Restangular.all('results/un_update/' + event_id + '/' + player_id).post().then(function(player_result) {
                console.log(player_result);
              });
            }
        });
      });
  }

  $scope.getBoost = function(event_id) {
    Restangular.all('boost/' + event_id).get('boost').then(function(res) {
        if (res)
        {
          $scope.boosted = res.son_id;
          return (res.son_id);
        }
        else
          return (0);
      });
  }

  Events.one($stateParams.eid).then(function(ev) {
    // Events.one(ev.eid).get('rsvp').then(function(res) {
    //   $scope.attending = true;
    // });

    $scope.ev = ev;

//     Users.get('names').then(function(users) {
// console.log (user);
//     });

    if (Global.user)
    {
      $scope.ev.player_id = Global.user.facebook.id;
      $scope.boosted = $scope.getBoost($scope.ev.eid);
    }

    if (ev.list_event_players) {
      Restangular.all('users/' + ev.list_event_players.toString()).get('info').then(function(players) {
        ev.list_event_players = players;
      });
      Restangular.all('results/' + ev.list_event_players.toString() + '/' + ev.eid).get('results').then(function(results) {
        ev.results = results;

        for(i = 0; i < ev.list_event_players.length; i++) {
          if (results && results[i])
            ev.list_event_players[i].result = results[i].result;
          else
            ev.list_event_players[i].result = 0;
        }

      });
    }

    if (Global.authenticated) {
      if ($scope.ev.attending.indexOf(parseInt(window.user.facebook.id)) > 0) {
        $scope.attending = 'attending';
      }

      Restangular.all('events/' + ev.eid).get('attendings').then(function(result) {
        $scope.ev.attending = result;

        if ($scope.ev.attending.indexOf(parseInt(window.user.facebook.id)) > 0) {
          $scope.attending = 'attending';
        } else {
          $scope.attending = '';
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
        $scope.attending = '';
      });
    }

    $scope.sendInvitations = function (eid) {
      Restangular.all('invite/' + ev.eid + '/100004646590264').post().then(function(res) {
      });
    }

    $scope.shareEvent = function () {
      $scope.isDisabled = "true";
      $scope.btnShareText = "Sharing...";

      Restangular.all('share/' + ev.eid).post().then(function(res) {
        $scope.shared = true;

        Restangular.all('results/' + ev.eid).post().then(function(player_result) {
          console.log(player_result);
        });

      });
    }
  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};