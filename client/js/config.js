app.config(function($locationProvider, $urlRouterProvider, $stateProvider, ezfbProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

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
      // url: '/{city}',
      // url: '/{city}{slash:[/]?}{tag}',
      url: '/?since?lng?lat?country?tags?sortBy',
      templateUrl: 'event/list',
      controller: 'ListCtrl',
      resolve: {
        evs: function(Event, $stateParams) {
          return Event.get($stateParams);
        }
      }
    })
    .state('list.view', {
      url: ':slug/:eid',
      templateUrl: 'event/view',
      controller: 'ViewCtrl',
      parent: 'list',
      resolve: {
        ev: function(Event, $stateParams) {
          return Event.getOne($stateParams.eid);
        }
      }
    })
    .state('me', {
      parent: '',
      url: '/me/events',
      templateUrl: 'user/user'
    })
    .state('me.events', {
      parent: 'me',
      url: '/me/events',
      templateUrl: 'event/user'
    })
    .state('me.logout', {
      parent: 'me',
      url: '/me/logout'
    });

  $urlRouterProvider.otherwise('/');

  ezfbProvider.setInitParams({
    appId: window.fbAppId,
    version: 'v2.2'
  });
});

app.config(function(datepickerPopupConfig) {
  // datepickerPopupConfig.appendToBody = true;
  datepickerPopupConfig.showButtonBar = false;
});

app.run(function($rootScope, $state, $stateParams, $localStorage, amMoment, ezfb, Geoip, Event) { //geolocation, reverseGeocode
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

  $rootScope.lang = navigator.language || navigator.userLanguage;

  amMoment.changeLocale($rootScope.lang);

  $rootScope.today = new Date();

  $rootScope.today.setSeconds(0);
  $rootScope.today.setMinutes(0);
  $rootScope.today.setHours(0);

  $rootScope.user = window.user;

  $rootScope.isMobile = window.isMobile;
  
  if (!$localStorage.lng || !$localStorage.lat) {
    Geoip.getLocation().success(function(data) {

      var loc = data.loc.split(',');
      loc = {
        lng: loc[1],
        lat: loc[0]
      };

      Event.query.lng = loc.lng;
      Event.query.lat = loc.lat;
      // delete res.data.loc;

      // $.address = res.data;

      $rootScope.city = data.region;

      $localStorage.lng = loc.lng;
      $localStorage.lat = loc.lat;
      $localStorage.city = $rootScope.city;



      // $localStorage.address = $rootScope.address;
      // $localStorage.city = $rootScope.city;
      // if ($state.current.name === 'home') {
      //   $state.transitionTo('list', {
      //     city: $rootScope.city
      //   });
      // }
    }).error(function(err) {
      console.log(err);
      Event.query.lng =  2.294694;
      Event.query.lat = 48.858093;
    });
  } else {
    // $rootScope.address = $localStorage.address;
    $rootScope.city = $localStorage.city;
    Event.query.lng = $localStorage.lng;
    Event.query.lat = $localStorage.lat;
    
    // if ($state.current.name === '') {
    // $state.transitionTo('list', {
    //   city: $rootScope.city
    // });
    // }
  }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    // console.log(toState);
    // if (!toState.parent) {
    //   $rootScope.listRendered = true;
    // } else if (!$rootScope.listRendered) {
    //   // $rootScope.iso.layout();
    //   console.log($state.current);
    // }
    // console.log(fromState);
    // console.log(toState);
    // if (fromState.name === '' && toState.name === 'list') {
    //   $rootScope.listRendered = true;
    // } else if (fromState.parent === 'list' && toState.name === 'list') {
    //   $rootScope.renderList = true;
    // }

      // if (fromState.name === 'list.view' && toState.name === 'list') {
      //   $('#view').hide();
      //   event.preventDefault();
      // }
      $rootScope.menuOpen = false;
  });

  ezfb.init();
});