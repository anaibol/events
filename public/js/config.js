'use strict';

//Setting up route
app.config(function($locationProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

// app.config(['$locationProvider',
//   function($locationProvider) {
//     $locationProvider.html5Mode(true);
//   }
// ]);


  // $stateProvider
  //   .state('home', {
  //     url: '/',
  //     templateUrl: '/views/events/home.html',
  //     controller: 'EventsCtrl'
  //   })
  //   .state('myEvents', {
  //     url: '/me/events',
  //     templateUrl: '/views/events/home.html',
  //     controller: 'EventsCtrl'
  //   })
  //   .state('userEvents', {
  //     url: '/:user/events',
  //     templateUrl: '/views/events/home.html',
  //     controller: 'EventsCtrl'
  //   })
  //   .state('worldwide', {
  //     url: '/worldwide',
  //     templateUrl: '/views/events/home.html',
  //     controller: 'EventsCtrl'
  //   })
  //   .state('eventsByDate', {
  //     url: '/date/:date',
  //     templateUrl: '/views/events/home.html',
  //     controller: 'EventsCtrl'
  //   })
  //   .state('popular', {
  //     url: '/popular',
  //     templateUrl: '/views/events/home.html',
  //   })
  //   .state('festival', {
  //     url: '/festival',
  //     templateUrl: '/views/events/home.html',
  //   })
  //   .state('free', {
  //     url: '/free',
  //     templateUrl: '/views/events/home.html'
  //   })
  //   .state('today', {
  //     url: '/today',
  //     templateUrl: '/views/events/home.html'
  //   })
  //   .state('weekend', {
  //     url: '/weekend',
  //     templateUrl: '/views/events/home.html'
  //   })
  //   .state('create', {
  //     url: '/create',
  //     templateUrl: '/views/events/create.html'
  //   })
  //   .state('edit', {
  //     url: '/:eventId/edit',
  //     templateUrl: '/views/events/create.html'
  //   })
  //   .state('view', {
  //     url: '/:slug',
  //     templateUrl: '/views/events/view.html',
  //     controller: 'EventCtrl'
  //   });


  $routeProvider.
  when('/', {
    templateUrl: '/views/events/home.html'
  }).
  when('/me/events', {
    templateUrl: '/views/events/home.html',
    controller: 'EventsCtrl'
  }).
  when('/:user/events', {
    templateUrl: '/views/events/home.html',
    controller: 'EventsCtrl'
  }).
  when('/worldwide', {
    templateUrl: '/views/events/home.html',
    controller: 'EventsCtrl'
  }).
  when('/date/:date', {
    templateUrl: '/views/events/home.html',
    controller: 'EventsCtrl'
  }).
  when('/popular', {
    templateUrl: '/views/events/home.html',
  }).
  when('/festival', {
    templateUrl: '/views/events/home.html',
    controller: 'EventsCtrl' // rapha add
  }).
  when('/free', {
    templateUrl: '/views/events/home.html'
  }).
  when('/today', {
    templateUrl: '/views/events/home.html'
  }).
  when('/weekend', {
    templateUrl: '/views/events/home.html'
  }).
  when('/create', {
    templateUrl: '/views/events/create.html'
  }).
  when('/:eventId/edit', {
    templateUrl: '/views/events/create.html'
  }).
  when('/:slug', {
    templateUrl: '/views/events/view.html',
    controller: 'EventCtrl'
  })

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

app.run(function(Api) { //ezfb
  // ezfb.init();
  Api(['user', 'event']);
});