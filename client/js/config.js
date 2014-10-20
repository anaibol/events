app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('list', {
      url: '/{city}{tag}',
      controller: 'ListCtrl',
      templateUrl: 'event/list',
      resolve: {
        events: function($stateParams, Event) {
          $stateParams = _.compact($stateParams);
          return Event.findAll($stateParams);
          // return $http.get('boost');
        }
      }
      // abstract: true
    })
  // .state('city', {
  //   url: ':city',
  //   templateUrl: 'event/lisxt'
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
    url: '{query}{slug:(?:/[^/]+)?}/{eid:[^/d]*}',
    // url: '^/:slug/:eid',
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

app.config(function(ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: window.fbAppId
  });
});

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

app.run(function($state, $rootScope, amMoment, ezfb) {
  ezfb.init();

  $rootScope.$state = $state;

  var userLang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale(userLang);


  $rootScope.today = new Date();

  $rootScope.today.setSeconds(0);
  $rootScope.today.setMinutes(0);
  $rootScope.today.setHours(0);

  // $scope.filter = {
  //   sortBy: 'start_time',
  //   sortOrder: '1',
  //   since: 0,
  //   until: 0,
  //   limit: 30,
  //   skip: 0
  // };

  // var str = $location.$$path.replace('/', '');

  // if ($stateParams.date) {
  //   $scope.filter.type = 'date';
  //   $scope.filter.since = new Date($stateParams.date).getTime();
  // } else {
  //   $scope.filter.since = $scope.today.getTime();
  // }

  // if (str === 'me/events') {
  //   $scope.filter.type = 'user';
  // } else if ($stateParams.user) {
  //   $scope.filter.type = 'user';
  //   $scope.filter.user = $stateParams.user;
  // } else {
  //   if (str === 'popular') {
  //     $scope.filter.sortBy = 'attending_count';
  //     $scope.filter.sortOrder = '-1';
  //   }
  //   if (str === 'festival') {
  //     $scope.filter.sortBy = 'attending_count';
  //     $scope.filter.sortOrder = '-1';
  //   }
  //   if (str) {
  //     $scope.filter.type = str;
  //   }
  // }


});