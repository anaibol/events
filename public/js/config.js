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
    when('/popular', {
      templateUrl: 'views/events/home.html',
    }).
    when('/free', {
      templateUrl: 'views/events/home.html'
    }).
    when('/today', {
      templateUrl: 'views/events/home.html'
    }).
    when('/weekend', {
      templateUrl: 'views/events/home.html'
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
]);


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

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

angular.module('mean').run(function($FB, Api) {
  $FB.init({
    // This is my FB app id for plunker demo app
    appId: window.fbAppId
  });

  Api(['user', 'event']);
});