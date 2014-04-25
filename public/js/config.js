'use strict';

//Setting up route
app.config(['$routeProvider',
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
app.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

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

app.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: window.fbAppId
  });
});

// angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 1000);

app.run(function(ezfb, Api) {
  ezfb.init();
  Api(['user', 'event']);
});