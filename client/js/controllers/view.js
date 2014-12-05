app.controller('ViewCtrl', function($scope, $rootScope, $state, ezfb, $modal, $http, Instagram, ev, fbphoto, fbvideos, $templateCache ) {
  // console.log(ev);
  $scope.ev = ev;
  if ($scope.ev.price.edited)
    $scope.ev.price.full = $scope.ev.price.edited;
  $scope.editing = false;
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
$scope.switchToInput = function () {
    var $input = $('<input id="edit">', {
        val: $(this).text(),
        type: 'text'
    });
    $input.addClass('loadNum');
    $(this).replaceWith($input);
    $input.on('blur', $scope.switchToSpan);
    $input.select();
};
$scope.switchToSpan = function () {
    if (document.getElementById('edit').value != '')
    {
      $scope.ev.price.full = document.getElementById('edit').value;
      $http({method: 'POST',data:{eid:$scope.ev.eid, edited_price: $scope.ev.price.full},url: '/api/updateprice/' + $scope.ev.eid})
      var $span = $('<span>', {
          text: $(this).val()
    });
    }
    else
    {
    var $span = $('<span>', {
          text: $scope.ev.price.full
      });
    }
    $span.addClass('loadNum');
    $(this).replaceWith($span);
    $span.on('click', $scope.switchToInput);
};
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

  $scope.getCoverTopPosition = function() {
    offset_y = ev.pic_cover.offset_y;

    var cover_w = 740;
    var cover_h = 295;
    var elm = angular.element('.header > img');
    var img_w = elm.width();
    var img_h = elm.height();
    var real_img_h = (cover_w * img_h / img_w) - cover_h;
    var top = parseInt(real_img_h * offset_y / 100);
    return ('-' + top + 'px');
  };

  $scope.coverTopPosition = $scope.getCoverTopPosition();

  $scope.promote = function(ev) {
    var modalInstance2 = $modal.open({
      templateUrl: 'event/promote',
      controller: 'EventPromoteCtrl',
      resolve: {
        ev: function() {
          return ev;
        }
      }
    });

    modalInstance2.result.then(function(selected) {
    }, function() {});
  };
});

  // $scope.attending = '';
  // $scope.today = new Date();

  // $scope.ev = event,

  //  $scope.attending = 'Join';
  // // $scope.shared = false;

  //  $scope.isDisabled = false;
  // // $scope.btnShareText = 'Share with your friends?';
  // // $scope.btnShareClass = 'btn btn-success';

  //  $scope.isBtnJoinDisabled = false;
  // // $scope.btnJoinText = 'Join';

  //  $scope.isBtnLeaveDisabled = false;
  //  $scope.ev.promotion = {};
  //  $scope.ev.in_promotion = false;
  //$scope.btnLeaveText = 'Leave';

  // $scope.boosted = 0;

  // $scope.ev.player_result = 0;

  // $scope.convertToUTC = function(date, timezone) {
  //   date = new Date(date);

  //   if (!timezone) {
  //     return date;
  //   }

  //   var transformed = moment(date.getTime()).tz(timezone).format('YYYY/MM/DD hh:mm A');
  //   transformed = new Date(transformed);

  //   return transformed;
  // };

  // $scope.isInPromotion = function() {
  //    var currentDate = new Date();

  //    if ($scope.ev) {
  //      if ($scope.ev.in_promotion) {

  //        var end_date = $scope.convertToUTC($scope.ev.promotion.end_time, 'UTC');

  //        if (end_date >= currentDate) {
  //         return (true);
  //        }
  //     }
  //    }
  //    return (false);
  //  }

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
  //   $http.get('boost/' + event_id + '/' + player_id + '/sup').post().success(function(res) {
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
  // if (!$scope.ev.list_event_players) {
  //   $scope.ev.list_event_players = [];
  // }

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
  //           $scope.btnShareClass = 'btn';
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
  // if (Global.authenticated) {
  //   $http.get('/api/rsvp/' + $scope.ev.eid + '/attendings').success(function(result) {
  //     $scope.ev.attending = result;

  //     if ($scope.ev.attending.indexOf(parseInt(window.user.facebook.id)) >= 0) {
  //       $scope.attending = 'Leave';
  //     } else {
  //       $scope.attending = 'Join';
  //     }
  //   });
  // }
  // var rsvp = Events.one(ev.eid);

  // Restangular.one('events', ev.eid)

  // $scope.setAttending = function(eid) {
  //   $scope.isBtnJoinDisabled = 'true';
  //   $scope.btnJoinText = '...';

  //   $http.get('events/' + ev.eid + '/rsvp').post({
  //     attendingStatus: 'attending'
  //   }).success(function(res, err) {
  //     if (err) {
  //       console.log(err);
  //       $scope.isBtnJoinDisabled = false;
  //       $scope.btnJoinText = 'Please log-in';
  //     } else {
  //       $scope.attending = 'attending';
  //       $scope.isBtnJoinDisabled = false;
  //       $scope.btnJoinText = 'Join';
  //       $scope.ev.attending.push(Global.user.facebook.id);

  //       if (!$scope.ev.list_event_players)
  //         $scope.ev.list_event_players = [];


  //       var find = 0;

  //       for (i = 0; i < $scope.ev.list_event_players.length && find == 0; i++) {
  //         if ($scope.ev.list_event_players[i].facebook.id == Global.user.facebook.id)
  //           find = 1;
  //       }

  //       if (find) {
  //         console.log('Ok');
  //         for (i = 0; i < $scope.ev.list_event_players.length; i++) {
  //           if ($scope.ev.list_event_players[i].facebook.id == $scope.ev.player_id) {
  //             $scope.ev.list_event_players[i].result += 6;
  //             $scope.ev.player_result += 6;
  //             i = $scope.ev.list_event_players.length;
  //           }
  //         }
  //       } else {
  //         console.log('Test');
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
  //   $scope.isBtnLeaveDisabled = 'true';
  //   $scope.btnLeaveText = '...';

  //   $http.get('events/' + ev.eid + '/rsvp').post({
  //     attendingStatus: 'declined'
  //   }).success(function(res) {
  //     if ($scope.attending == 'attending') {
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
  //     $scope.btnLeaveText = 'Leave';


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
  //   $scope.isDisabled = 'true';
  //   $scope.btnShareText = 'Sharing...';

  //   FB.ui(
  //       {
  //         method: 'share',
  //         href: link,
  //       },
  //       function(response) {
  //         if (response && !response.error_code) {
  //           $scope.shared = true;
  //           console.log('Shared');
  //         } else {
  //           $scope.isDisabled = '';
  //           $scope.btnShareText = 'Share with your friends?';
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
  //       $scope.btnShareText = 'Share again?';
  //       $scope.btnShareClass = 'btn';

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