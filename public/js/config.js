'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'views/events/home.html'
    }).
    when('/worldwide', {
      templateUrl: 'views/events/home.html',
    }).
    when('/events', {
      templateUrl: 'views/events/list.html'
    }).
    when('/create', {
      templateUrl: 'views/events/create.html'
    }).
    when('/:eventId/edit', {
      templateUrl: 'views/events/create.html'
    }).
    when('/events/:eventId', {
      templateUrl: 'views/events/view.html'
    }).
    /*when('/', {
    //  templateUrl: 'views/index.html'
    }).*/
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

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

angular.module('mean').config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
});

angular.module('mean').run(function($FB) {
  $FB.init({
    // This is my FB app id for plunker demo app
    appId: window.fbAppId
  });
});