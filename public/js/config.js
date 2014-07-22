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
      templateUrl: '/views/events/home.html'
    })
    .state('myEvents', {
      url: '/me/events',
      templateUrl: '/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('userEvents', {
      url: '/:user/events',
      templateUrl: '/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('worldwide', {
      url: '/worldwide',
      templateUrl: '/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('eventsByDate', {
      url: '/date/:date',
      templateUrl: '/views/events/home.html',
      controller: 'EventsCtrl'
    })
    .state('popular', {
      url: '/popular',
      templateUrl: '/views/events/home.html',
    })
    .state('festival', {
      url: '/festival',
      templateUrl: '/views/events/home.html',
    })
    .state('free', {
      url: '/free',
      templateUrl: '/views/events/home.html'
    })
    .state('today', {
      url: '/today',
      templateUrl: '/views/events/home.html'
    })
    .state('weekend', {
      url: '/weekend',
      templateUrl: '/views/events/home.html'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/views/events/create.html'
    });
    
    $urlRouterProvider.otherwise('');

    modalStateProvider.state('home.edit', {
      url: ':slug/edit',
      templateUrl: '/views/events/form.html',
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

    modalStateProvider.state('home.privacy', {
      url: '/privacy',
      templateUrl: '/views/privacy.html',
        controller: function() {
          alert(1)
        }
    });

    modalStateProvider.state('home.view', {
      url: ':slug',
      templateUrl: '/views/events/view.html',
      controller: 'EventCtrl',
      // resolve: {
      //   ev: function() {
      //     return ev;
      //   }
      // }
    });

  // $routeProvider.
  // when('/', {
  //   templateUrl: '/views/events/home.html'
  // }).
  // when('/me/events', {
  //   templateUrl: '/views/events/home.html',
  //   controller: 'EventsCtrl'
  // }).
  // when('/:user/events', {
  //   templateUrl: '/views/events/home.html',
  //   controller: 'EventsCtrl'
  // }).
  // when('/worldwide', {
  //   templateUrl: '/views/events/home.html',
  //   controller: 'EventsCtrl'
  // }).
  // when('/date/:date', {
  //   templateUrl: '/views/events/home.html',
  //   controller: 'EventsCtrl'
  // }).
  // when('/popular', {
  //   templateUrl: '/views/events/home.html',
  // }).
  // when('/festival', {
  //   templateUrl: '/views/events/home.html',
  //   controller: 'EventsCtrl' // rapha add
  // }).
  // when('/free', {
  //   templateUrl: '/views/events/home.html'
  // }).
  // when('/today', {
  //   templateUrl: '/views/events/home.html'
  // }).
  // when('/weekend', {
  //   templateUrl: '/views/events/home.html'
  // }).
  // when('/create', {
  //   templateUrl: '/views/events/create.html'
  // }).
  // when('/:eventId/edit', {
  //   templateUrl: '/views/events/create.html'
  // }).
  // when('/:slug', {
  //   templateUrl: '/views/events/view.html',
  //   controller: 'EventCtrl'
  // })

  // .
  // .state('', {'/', {
  // //  templateUrl: '/views/index.html'
  // }).
  // otherwise({
  //   redirectTo: '/'
  // });
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

// app.config(function (ezfbProvider) {
//   ezfbProvider.setInitParams({
//     appId: window.fbAppId
//   });
// });

// app.config(function (ApiProvider) {
//   ApiProvider.setEntities(['user', 'event']);
// });

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

app.run(function(Api, $rootScope, $state) { //ezfb
  // ezfb.init();
  Api(['user', 'event']);


// $rootScope.$on('$locationChangeSuccess', function(event,  $location, $routeParams) {
//   alert(1)

// console.log( $location)

//     if ($location === 'http://localhost:3000/co-voiturage-kizomba-swimming-festival-2014') {
//     //    alert(2)

//     alert(2)
//       event.preventDefault();
//     //   return angular.element($document[0].body).addClass('can-load-modal');
//      }
//   });

    var lastRoute = $state.current;
    $rootScope.$on('$locationChangeSuccess', function(event) {
        $state.current = lastRoute;

        console.log(lastRoute)
              event.preventDefault();
    });

// $rootScope.$on('$stateUpdate', function (event, nextState, currentState) {
//   alert(1)
//   console.log(nextState);
//   console.log();
//   console.log();

//         event.preventDefault();
// });

});