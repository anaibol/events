'use strict';

//Setting up route
app.config(function($locationProvider, $urlRouterProvider, $stateProvider) {

  $locationProvider.html5Mode(true);

  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })
    .state('event', {
      url: '/events/:slug/:eid',
      templateUrl: '/views/event/view.html',
    })
    .state('events', {
      url: ':keyword',
      templateUrl: '/views/event/list.html',
    })
    .state('me', {
      parent: "",
      url: '/me/events',
      templateUrl: '/views/user/user.html',
    })
    .state('me.events', {
      parent: "me",
      url: '/me/events',
      templateUrl: '/views/event/user.html',
    })
    .state('me.logout', {
      parent: "me",
      url: '/me/logout'
    })
    .state('eventsByDate', {
      url: '/date/:date',
      templateUrl: '/views/main.html',
    })
    .state('keyword', {
      url: '/:keyword',
      templateUrl: '/views/main.html'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/views/event/create.html'
    });
    
    $urlRouterProvider.otherwise('');
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

app.run(function(Api, $rootScope, $state, amMoment) { //ezfb
  // ezfb.init();

  var userLang = navigator.language || navigator.userLanguage; 

  amMoment.changeLocale(userLang);

  Api(['user', 'event']);
});