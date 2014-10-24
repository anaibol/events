app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

  $stateProvider
  // .state('home', {
  //   url: '/',
  //   // url: '/',
  //   // controller: 'ListCtrl',
  //   // templateUrl: 'event/list',
  //   controller: function() {
  //     //   events: function($stateParams, Event) {
  //     //     console.log($stateParams);
  //     //     // $stateParams = _.compact($stateParams);

  //     //     return Event.findAll($stateParams);
  //   }
  //   // }
  // })
  .state('list', {
    // url: '{city}{slash:[/]?}{tag:[^0-9]}',
    url: '/{city:(?:/[^/]+)?}',
    controller: 'ListCtrl',
    templateUrl: 'event/list',
    resolve: {
      events: function($rootScope, Event) {
        return Event.findAll($rootScope.loc);
      }
    }
  })
    .state('list.view', {
      // url: '{slug:(?:/[^/]+)?}/{eid:[^/d]*}',
      url: '/:slug/:eid',
      templateUrl: "event/view",
      controller: 'ViewCtrl',
      parent: 'list',
      resolve: {
        event: function($stateParams, Event) {
          console.log($stateParams);
          return Event.find($stateParams.eid);
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

app.run(function($rootScope, $state, $stateParams, $localStorage, amMoment, ezfb, geoip, slug) { //geolocation, reverseGeocode
  // var off = $rootScope.$on('$stateChangeStart', function(evt, toState, toParams, fromState, fromParams) {
  //   // evt.preventDefault();
  //   $state.params = toParams;
  //   angular.copy($state.params, $stateParams);
  //   off();
  // });
  // geolocation.getLocation().then(function(data) {
  //   $rootScope.loc = {
  //     lat: data.coords.latitude,
  //     lng: data.coords.longitude
  //   };

  //   reverseGeocode.getAddress($rootScope.loc.lat, $rootScope.loc.lng, function(address) {
  //     $rootScope.address = address;
  //     console.log($rootScope.address);
  //   });
  // });

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  var userLang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale(userLang);


  $rootScope.today = new Date();

  $rootScope.today.setSeconds(0);
  $rootScope.today.setMinutes(0);
  $rootScope.today.setHours(0);

  $rootScope.user = window.user;

  if (!$localStorage.city || !$localStorage.loc) {
    geoip.getLocation().then(function(res) {
      var loc = res.data.loc;
      console.log(res.data);
      loc = loc.split(',');

      $rootScope.loc = {
        lat: loc[0],
        lng: loc[1]
      };

      delete res.data.loc;

      $rootScope.address = res.data;
      $rootScope.city = slug.slugify($rootScope.address.region);

      $localStorage.loc = $rootScope.loc;
      $localStorage.address = $rootScope.address;
      $localStorage.city = $rootScope.city;

      if ($state.current.name === 'home') {
        $state.transitionTo('list', {
          city: $rootScope.city
        });
      }
    });
  } else {
    $rootScope.address = $localStorage.address;
    $rootScope.city = $localStorage.city;
    $rootScope.loc = $localStorage.loc;

    // if ($state.current.name === '') {
    // $state.transitionTo('list', {
    //   city: $rootScope.city
    // });
    // }
  }

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

  ezfb.init();
});