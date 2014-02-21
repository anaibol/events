'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/events', {
      templateUrl: 'views/events/list.html'
    }).
    when('/events/create', {
      templateUrl: 'views/events/create.html'
    }).
    when('/events/:eventId/edit', {
      templateUrl: 'views/events/edit.html'
    }).
    when('/events/:eventId', {
      templateUrl: 'views/events/view.html'
    }).
    when('/', {
      templateUrl: 'views/index.html'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
])

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.module('mean').run(function($FB) {
  $FB.init({
    // This is my FB app id for plunker demo app
    appId: window.fbAppId
  });
});