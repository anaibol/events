app.controller('ViewCtrl', function($scope, Global, ezfb, Event, $http, event) {
  $scope.today = new Date();

  $scope.ev = event;

   $scope.attending = 'Join';
  // $scope.shared = false;

   $scope.isDisabled = false;
  // $scope.btnShareText = "Share with your friends?";
  // $scope.btnShareClass = "btn btn-success";

   $scope.isBtnJoinDisabled = false;
  // $scope.btnJoinText = "Join";

   $scope.isBtnLeaveDisabled = false;
   $scope.ev.promotion = {};
   $scope.ev.in_promotion = false;
   //$scope.btnLeaveText = "Leave";

  // $scope.boosted = 0;

  // $scope.ev.player_result = 0;

  // $scope.convertToUTC = function(date, timezone) {
  //   date = new Date(date);

  //   if (!timezone) {
  //     return date;
  //   }

  //   var transformed = moment(date.getTime()).tz(timezone).format("YYYY/MM/DD hh:mm A");
  //   transformed = new Date(transformed);

  //   return transformed;
  // };

   //$scope.getPromoteLink = function() {
   //  return $state.current.name.split('.')[0] + '.promote(ev)';
  // }

  $scope.isInPromotion = function() {
     var currentDate = new Date();

     if ($scope.ev) {
       if ($scope.ev.in_promotion) {

         var end_date = $scope.convertToUTC($scope.ev.promotion.end_time, "UTC");

         if (end_date >= currentDate) {
          return (true);
         }
      }
     }
     return (false);
   }

  // $scope.addBoost = function(player, event_id, btn) {
  //   $http.get('boost/' + event_id + '/' + player.facebook.id).post().success(function(res) {
  //     $scope.boosted = res.son_id;
  //     console.log(res);

  //     $http.get('boost/update/' + event_id + '/' + player.facebook.id).post().success(function(player_result) {
  //       $http.get('results/update/' + event_id + '/' + player.facebook.id).post().success(function(player_result) {
  //         player.result = player_result.result_boosted;
  //       });
  //     });
  //   });
  // }

  // $scope.supBoost = function(player_id, event_id) {
  //   $http.get('boost/' + event_id + '/' + player_id + "/sup").post().success(function(res) {
  //     $scope.boosted = 0;

  //     $http.get('results/' + player_id + '/' + event_id).get('result').success(function(player_res) {
  //       $http.get('results/un_update/' + event_id + '/' + player_id).post().success(function(player_result) {
  //         console.log(player_result);
  //       });
  //     });
  //   });
  // }

  // $scope.getBoost = function(event_id) {
  //   $http.get('boost/' + event_id).get('boost').success(function(res) {
  //     if (res) {
  //       $scope.boosted = res.son_id;
  //       return (res.son_id);
  //     } else
  //       return (0);
  //   });
  // }

   if (!$scope.ev.list_event_players) {
     $scope.ev.list_event_players = [];
   }

  //     Users.get('names').success(function(users) {
  // console.log (user);
  //     });

  // if (Global.user) {
  //   $scope.ev.player_id = Global.user.facebook.id;
  //   $scope.boosted = $scope.getBoost($scope.ev.eid);
  // }

  // if ($scope.ev.in_promotion) {
  //   console.log($scope.ev.creator.id);
  //   $http.get('user/' + $scope.ev.creator.id).get('').success(function(user) {
  //     $scope.ev.promoter = user;
  //     console.log(user);
  //   });
  // }

  // if (ev.list_event_players) {
  //   $http.get('users/' + ev.list_event_players.toString()).get('info').success(function(players) {
  //     if (players) {
  //       for (i = 0; i < players.length; i++) {
  //         players[i].result = 2;
  //       }
  //     }

  //     $scope.ev.list_event_players = players;
  //   });

  //   $http.get('resolve/' + ev.eid).get('results').success(function(results) {

  //     for (i = 0; i < $scope.ev.list_event_players.length; i++) {
  //       for (j = 0; j < results.length; j++) {
  //         if ($scope.ev.list_event_players[i] && $scope.ev.list_event_players[i].facebook.id == results[j].user_id)
  //           $scope.ev.list_event_players[i].result = results[j].result_boosted;
  //         if ($scope.ev.list_event_players[i].facebook.id == $scope.ev.player_id && $scope.ev.list_event_players[i].facebook.id == results[j].user_id) {
  //           $scope.ev.player_result = results[j].result_boosted;
  //           $scope.btnShareClass = "btn";
  //         }
  //       }
  //     }

  //     console.log($scope.ev.list_event_players)

  //     /*for (i = 0; i < ev.list_event_players.length; i++) {
  //         for (j = i; j < ev.list_event_players.length; j++) {
  //           if (results) {
  //             if (results[i] && results[j] && results[i].result < results[j].result)
  //             {
  //               var play = ev.list_event_players[i];
  //               ev.list_event_players[i] = ev.list_event_players[j];
  //               ev.list_event_players[j] = play;
  //             }
  //           }
  //         }
  //       }*/

  //   });
  // }

  if (Global.authenticated) {
    $http.get('/api/rsvp/' + $scope.ev.eid + '/attendings').success(function(result) {
      $scope.ev.attending = result;

      if ($scope.ev.attending.indexOf(parseInt(window.user.facebook.id)) >= 0) {
        $scope.attending = 'Leave';
      } else {
        $scope.attending = 'Join';
      }
    });
  }

  // var rsvp = Events.one(ev.eid);

  // Restangular.one('events', ev.eid)

  // $scope.setAttending = function(eid) {
  //   $scope.isBtnJoinDisabled = "true";
  //   $scope.btnJoinText = "...";

  //   $http.get('events/' + ev.eid + '/rsvp').post({
  //     attendingStatus: 'attending'
  //   }).success(function(res, err) {
  //     if (err) {
  //       console.log(err);
  //       $scope.isBtnJoinDisabled = false;
  //       $scope.btnJoinText = "Please log-in";
  //     } else {
  //       $scope.attending = 'attending';
  //       $scope.isBtnJoinDisabled = false;
  //       $scope.btnJoinText = "Join";
  //       $scope.ev.attending.push(Global.user.facebook.id);

  //       if (!$scope.ev.list_event_players)
  //         $scope.ev.list_event_players = [];


  //       var find = 0;

  //       for (i = 0; i < $scope.ev.list_event_players.length && find == 0; i++) {
  //         if ($scope.ev.list_event_players[i].facebook.id == Global.user.facebook.id)
  //           find = 1;
  //       }

  //       if (find) {
  //         console.log("Ok");
  //         for (i = 0; i < $scope.ev.list_event_players.length; i++) {
  //           if ($scope.ev.list_event_players[i].facebook.id == $scope.ev.player_id) {
  //             $scope.ev.list_event_players[i].result += 6;
  //             $scope.ev.player_result += 6;
  //             i = $scope.ev.list_event_players.length;
  //           }
  //         }
  //       } else {
  //         console.log("Test");
  //         if (Global.user) {
  //           if (!Global.user.result)
  //             Global.user.result = 2;
  //           for (i = 0; i < $scope.ev.attending.length; i++) {
  //             if ($scope.ev.attending[i] == Global.user.facebook.id)
  //               Global.user.result += 6;
  //           }
  //           console.log($scope.ev.list_event_players);

  //           $scope.ev.list_event_players.push(Global.user);
  //           $scope.ev.player_result = Global.user.result;
  //           $http.get('results/' + $scope.ev.eid).post().success(function(res) {});
  //         }
  //       }

  //     }
  //   });
  // }

  // $scope.setNotAttending = function(eid) {
  //   $scope.isBtnLeaveDisabled = "true";
  //   $scope.btnLeaveText = "...";

  //   $http.get('events/' + ev.eid + '/rsvp').post({
  //     attendingStatus: 'declined'
  //   }).success(function(res) {
  //     if ($scope.attending == "attending") {
  //       if (!$scope.ev.list_event_players)
  //         $scope.ev.list_event_players = [];
  //       else
  //         for (i = 0; i < $scope.ev.list_event_players.length; i++) {
  //           if ($scope.ev.list_event_players[i].facebook.id == $scope.ev.player_id) {
  //             $scope.ev.list_event_players[i].result -= 6;
  //             $scope.ev.player_result -= 6;
  //             i = $scope.ev.list_event_players.length;
  //           }
  //         }
  //     }

  //     $scope.attending = '';
  //     $scope.isBtnLeaveDisabled = false;
  //     $scope.btnLeaveText = "Leave";


  //     var index = -1;

  //     for (i = 0; i < $scope.ev.list_event_players.length && index == -1; i++) {
  //       if ($scope.ev.list_event_players[i].facebook.id == Global.user.facebook.id)
  //         index = i;
  //     }

  //     if (index != -1)
  //       $scope.ev.attending.splice(index, 1);
  //   });
  // }

  // $scope.sendInvitations = function(eid) {
  //   $http.get('invite/' + ev.eid + '/100004646590264').post().success(function(res) {});
  // }

  // $scope.shareEvent = function() {
  //   $scope.isDisabled = "true";
  //   $scope.btnShareText = "Sharing...";

  //   FB.ui(
  //       {
  //         method: 'share',
  //         href: link,
  //       },
  //       function(response) {
  //         if (response && !response.error_code) {
  //           $scope.shared = true;
  //           console.log("Shared");
  //         } else {
  //           $scope.isDisabled = "";
  //           $scope.btnShareText = "Share with your friends?";
  //         }
  //       }
  //     );

  //   $http.get('share/' + ev.eid).post().success(function(res) {
  //     console.log(res);
  //     if (res.error) {
  //       $scope.isDisabled = false;
  //       $scope.btnShareText = res.error;
  //     } else {
  //       $scope.isDisabled = false;
  //       $scope.btnShareText = "Share again?";
  //       $scope.btnShareClass = "btn";

  //       var find = 0;

  //       if (!$scope.ev.list_event_players)
  //         $scope.ev.list_event_players = [];

  //       for (i = 0; i < $scope.ev.list_event_players.length && find == 0; i++) {
  //         if ($scope.ev.list_event_players[i].facebook.id == Global.user.facebook.id)
  //           find = 1;
  //       }

  //       if (!find) {
  //         if (Global.user) {
  //           if (!Global.user.result)
  //             Global.user.result = 2;
  //           for (i = 0; i < $scope.ev.attending.length; i++) {
  //             if ($scope.ev.attending[i] == Global.user.facebook.id)
  //               Global.user.result += 6;
  //           }
  //           $scope.ev.list_event_players.push(Global.user);
  //           $scope.ev.player_result = Global.user.result;
  //         }
  //       }

  //     }
  //     $http.get('results/' + $scope.ev.eid).post().success(function(res) {});
  //   });
  // }
});