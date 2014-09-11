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

  $scope.ev.player_result = 0;

  $scope.getLink = function() {
    return $state.current.name.split('.')[0] + '.edit(ev)';
  }

  $scope.convertToUTC = function(date) {
    date = new Date(date);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
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
              Restangular.all('results/update/' + event_id + '/' + player_id).post().then(function(player_result) {
                console.log(player_result);
              });
        });
      });
  }

  $scope.supBoost = function(player_id, event_id) {
    Restangular.all('boost/' + event_id + '/' + player_id + "/sup").post().then(function(res) {
        $scope.boosted = 0;

        Restangular.all('results/' + player_id + '/' + event_id).get('result').then(function(player_res) {
              Restangular.all('results/un_update/' + event_id + '/' + player_id).post().then(function(player_result) {
                console.log(player_result);
              });
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

    $scope.ev.start_time = $scope.convertToUTC($scope.ev.start_time);
    $scope.ev.end_time = $scope.convertToUTC($scope.ev.end_time);

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
        if (players) {
          for (i = 0; i < players.length; i++) {
            players[i].result = 2;
          }
        }

        $scope.ev.list_event_players = players;
      });
      Restangular.all('results/' + ev.list_event_players.toString() + '/' + ev.eid).get('results').then(function(results) {

        for(i = 0; i < $scope.ev.list_event_players.length; i++) {
            for (j = 0; j < results.length; j++)
            {
              if ($scope.ev.list_event_players[i] && $scope.ev.list_event_players[i].facebook.id == results[j].user_id)
                $scope.ev.list_event_players[i].result = results[j].result_boosted;
              if ($scope.ev.list_event_players[i].facebook.id == $scope.ev.player_id && $scope.ev.list_event_players[i].facebook.id == results[j].user_id)
                $scope.ev.player_result = results[j].result_boosted;
            }
        }

        console.log($scope.ev.list_event_players)

        /*for (i = 0; i < ev.list_event_players.length; i++) {
          for (j = i; j < ev.list_event_players.length; j++) {
            if (results) {
              if (results[i] && results[j] && results[i].result < results[j].result)
              {
                var play = ev.list_event_players[i];
                ev.list_event_players[i] = ev.list_event_players[j];
                ev.list_event_players[j] = play;
              }
            }
          }
        }*/

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
        console.log(res);
        if (res.error)
        {
          $scope.isDisabled = "false";
          $scope.btnShareText = res.error;
        }
        else
        {
          $scope.shared = true;
          Restangular.all('results/' + ev.eid).post().then(function(player_result) {
            console.log(player_result);
          });
        }
        
      });
    }
  });

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};