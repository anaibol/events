'use strict';

//Setting up route
app.config(function($locationProvider, $urlRouterProvider, $stateProvider, modalStateProvider) {

  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

// app.config(['$locationProvider',
//   function($locationProvider) {
//     $locationProvider.html5Mode(true);
//   }
// ]);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/assets/views/events/home.html'
    })
    .state('myEvents', {
      url: '/me/events',
      templateUrl: '/assets/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('userEvents', {
      url: '/user/:user',
      templateUrl: '/assets/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('worldwide', {
      url: '/worldwide',
      templateUrl: '/assets/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('eventsByDate', {
      url: '/date/:date',
      templateUrl: '/assets/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('popular', {
      url: '/popular',
      templateUrl: '/assets/views/events/home.html',
    })
    .state('festival', {
      url: '/festival',
      templateUrl: '/assets/views/events/home.html',
    })
    .state('promote', {
      url: '/promote',
      templateUrl: '/assets/views/events/home.html',
    })
    .state('free', {
      url: '/free',
      templateUrl: '/assets/views/events/home.html'
    })
    .state('today', {
      url: '/today',
      templateUrl: '/assets/views/events/home.html'
    })
    .state('weekend', {
      url: '/weekend',
      templateUrl: '/assets/views/events/home.html'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/assets/views/events/create.html'
    });
    
    $urlRouterProvider.otherwise('');

    modalStateProvider.state('home.edit', {
      url: ':slug/:eid/edit',
      templateUrl: '/assets/views/events/form.html',
      controller: 'EventFormCtrl' //,
      // resolve: {
      //   ev: function() {
      //     Events.one('falsa-cubana-or-niceto-club').then(function(ev) {
      //       alert(1)
      //       return ev;
      //     });
      //   }
      // }
    });

    modalStateProvider.state('home.promote', {
      url: ':slug/:eid/promote',
      templateUrl: '/assets/views/events/promote_form.html',
      controller: 'EventFormCtrl',
    });

    modalStateProvider.state('home.terms', {
      url: 'terms',
      templateUrl: '/assets/views/terms.html'
    });

    modalStateProvider.state('home.privacy', {
      url: 'privacy',
      templateUrl: '/assets/views/privacy.html'
    });

    modalStateProvider.state('home.support', {
      url: 'support',
      templateUrl: '/assets/views/support.html'
    });

    modalStateProvider.state('home.view', {
      url: ':slug/:eid',
      templateUrl: '/assets/views/events/view.html',
      controller: 'EventCtrl',
      // resolve: {
      //   ev: function() {
      //     return ev;
      //   }
      // }
    });

    var modalStates = ['myEvents', 'userEvents', 'worldwide', 'popular', 'festival', 'free', 'today', 'weekend', 'create'];

    // for (var i in modalStates) {
    //   modalStateProvider.state(modalStates[i] + '.edit', {
    //     url: '/:slug/:eid/edit',
    //     templateUrl: '/assets/views/events/form.html',
    //     controller: 'EventFormCtrl' //,
    //     // resolve: {
    //     //   ev: function() {
    //     //     Events.one('falsa-cubana-or-niceto-club').then(function(ev) {
    //     //       alert(1)
    //     //       return ev;
    //     //     });
    //     //   }
    //     // }
    //   });

    //   modalStateProvider.state(modalStates[i] + '.terms', {
    //     url: '/terms',
    //     templateUrl: '/assets/views/terms.html'
    //   });

    //   modalStateProvider.state(modalStates[i] + '.support', {
    //     url: '/support',
    //     templateUrl: '/assets/views/support.html'
    //   });

    //   modalStateProvider.state(modalStates[i] + '.view', {
    //     url: '/:slug/:eid',
    //     templateUrl: '/assets/views/events/view.html',
    //     controller: 'EventCtrl',
    //     // resolve: {
    //     //   ev: function() {
    //     //     return ev;
    //     //   }
    //     // }
    //   });
    // }
});

app.config(function (datepickerPopupConfig) {
  datepickerPopupConfig.appendToBody = true;
});

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');

  RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
    if (operation === "getList") {
        // Use results as the return type, and save the result metadata
        // in _resultmeta
        var newResponse = response.data;

        newResponse.metadata = {
            "count": response.count,
            "next": response.next,
            "previous": response.previous
        };
        return newResponse;
    }

    return response;
  });
});

app.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: window.fbAppId
  });
});

// app.config(function (ApiProvider) {
//   ApiProvider.setEntities(['user', 'event']);
// });

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);


// var modalStates = ['myEvents', 'userEvents', 'worldwide', 'popular', 'festival', 'free', 'today', 'weekend', 'create'];

app.run(function(Api, $rootScope, $state, modalState, amMoment) { //ezfb
  // ezfb.init();

  var userLang = navigator.language || navigator.userLanguage; 

  amMoment.changeLocale(userLang);

  Api(['user', 'event']);

  // $rootScope.$on('$stateNotFound', function(event, toState, fromState, fromParams) {

  //   var str = modalStates.join("|");
  //   var re = new RegExp('/^(.*)\.' + str + '$/', "i");

  //   var match = toState.to.match(re); // "to" could be absolute or relative

  //   if (match) {
  //     // if we captured something, then "to" was absolute and we use it as is
  //     // otherwise, assume it was relative and combine it with the starting state name
  //     var modalStateName = match[0];

  //     modalState.state(modalStateName + '.edit', {
  //       url: '/:slug/:eid/edit',
  //       templateUrl: '/assets/views/events/form.html',
  //       controller: 'EventFormCtrl' //,
  //       // resolve: {
  //       //   ev: function() {
  //       //     Events.one('falsa-cubana-or-niceto-club').then(function(ev) {
  //       //       alert(1)
  //       //       return ev;
  //       //     });
  //       //   }
  //       // }
  //     });

  //     modalState.state(modalStateName + '.terms', {
  //       url: '/terms',
  //       templateUrl: '/assets/views/terms.html'
  //     });

  //     modalState.state(modalStateName + '.support', {
  //       url: '/support',
  //       templateUrl: '/assets/views/support.html'
  //     });

  //     modalState.state(modalStateName + '.view', {
  //       url: '/:slug/:eid',
  //       templateUrl: '/assets/views/events/view.html',
  //       controller: 'EventCtrl',
  //       // resolve: {
  //       //   ev: function() {
  //       //     return ev;
  //       //   }
  //       // }
  //     });

  //     // $state.go(toState.to);
  //   }
  // });

});