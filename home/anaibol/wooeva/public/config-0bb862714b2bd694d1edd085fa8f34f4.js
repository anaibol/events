'use strict';

//Setting up route
app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');


  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/partials/main.html'
    })
    .state('event', {
      url: '/events/:slug/:eid',
      templateUrl: "/partials/event/view.html"
    })
    .state('events', {
      url: ':keyword',
      templateUrl: '/partials/event/list.html'
    })
    .state('me', {
      parent: "",
      url: '/me/events',
      templateUrl: '/partials/user/user.html'
    })
    .state('me.events', {
      parent: "me",
      url: '/me/events',
      templateUrl: '/partials/event/user.html'
    })
    .state('me.logout', {
      parent: "me",
      url: '/me/logout'
    })
    .state('eventsByDate', {
      url: '/date/:date',
      templateUrl: '/partials/main.html',
    })
    .state('keyword', {
      url: '/:keyword',
      templateUrl: '/partials/main.html'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/partials/event/create.html'
    });


  // $routeSegmentProvider
  //   .when('/',                  'main')
  //   .when(':keyword',           'main')
  //   .when('/date/:date',        'main')
  //   .when('/events/:slug/:eid', 'event')
  //   .when('/me/events',         'main')
  //   .when('/me',                'me')
  //   .when('/me/logout',         'me.logout')
  //   .when('/create',            'create')

  //   segment('main', { templateUrl: 'views/main.html' })
  //   .within()
  //     .segment('event', { templateUrl: 'views/event/view.html' })
  //     .up()
  //   .segment('me', { templateUrl: 'views/me.html' })
  //   .segment('me.logout', { templateUrl: 'views/logout.html' })
  //   .segment('create', { templateUrl: 'views/create.html' });


  $urlRouterProvider.otherwise('');
});

app.config(function(datepickerPopupConfig) {
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

app.run(function(Api, $rootScope, $state, amMoment) { //ezfb
  // ezfb.init();

  var userLang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale(userLang);

  Api(['user', 'event']);
});