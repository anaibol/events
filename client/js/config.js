app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('list', {
      url: '/',
      controller: 'ListCtrl',
      templateUrl: 'event/list',
      // abstract: true
    })
  // .state('city', {
  //   url: ':city',
  //   templateUrl: 'event/list'
  // })
  // .state('tag', {
  //   url: 'tag/:tag',
  //   templateUrl: 'event/list'
  // })
  // .state('eventsByDate', {
  //   url: '/date/:date',
  //   templateUrl: 'event/list',
  // })
  // .state('keyword', {
  //   url: '/:keyword',
  //   templateUrl: 'event/list'
  // })
  .state('list.view', {
    // url: ':slug/{eid:[0-9]}',
    url: '^/:slug/:eid',
    templateUrl: "event/view",
    controller: 'ViewCtrl',
    parent: 'list',
    resolve: {
      event: function($stateParams, Event) {
        return Event.find($stateParams.eid);
        // return $http.get('boost');
      }
    }
  })
    .state('me', {
      parent: "",
      url: '/me/events',
      templateUrl: 'user/user'
    })
    .state('me.events', {
      parent: "me",
      url: '/me/events',
      templateUrl: 'event/user'
    })
    .state('me.logout', {
      parent: "me",
      url: '/me/logout'
    });

  // .state('create', {
  //   url: '/create',
  //   templateUrl: 'event/create'
  // });

  // $routeSegmentProvider
  //   .when('/',                  'main')
  //   .when(':keyword',           'main')
  //   .when('/date/:date',        'main')
  //   .when('/events/:slug/:eid', 'event')
  //   .when('/me/events',         'main')
  //   .when('/me',                'me')
  //   .when('/me/logout',         'me.logout')
  //   .when('/create',            'create')

  //   segment('main', { templateUrl: 'main' })
  //   .within()
  //     .segment('event', { templateUrl: 'event/view' })
  //     .up()
  //   .segment('me', { templateUrl: 'me' })
  //   .segment('me.logout', { templateUrl: 'logout' })
  //   .segment('create', { templateUrl: 'create' });


  $urlRouterProvider.otherwise('/');
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

app.run(function($state, $rootScope, amMoment, ezfb) {
  ezfb.init();

  $rootScope.$state = $state;

  var userLang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale(userLang);
});