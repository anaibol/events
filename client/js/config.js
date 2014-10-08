'use strict';

//Setting up route
app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/event/list.html'
    })
    .state('events', {
      url: ':keyword',
      templateUrl: '/views/event/list.html'
    })
    .state('eventsByDate', {
      url: '/date/:date',
      templateUrl: '/views/event/list.html',
    })
    .state('keyword', {
      url: '/:keyword',
      templateUrl: '/views/event/list.html'
    })
    .state('event', {
      url: '/events/:slug/:eid',
      templateUrl: "/views/event/view.html"
    })
    .state('me', {
      parent: "",
      url: '/me/events',
      templateUrl: '/views/user/user.html'
    })
    .state('me.events', {
      parent: "me",
      url: '/me/events',
      templateUrl: '/views/event/user.html'
    })
    .state('me.logout', {
      parent: "me",
      url: '/me/logout'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/views/event/create.html'
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

// app.config(function (ezfbProvider) {
//   ezfbProvider.setInitParams({
//     appId: window.fbAppId
//   });
// });

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

app.run(function($rootScope, $state, amMoment) { //ezfb
  // ezfb.init();

  var userLang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale(userLang);
});