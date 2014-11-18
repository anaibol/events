var fbtok = 'CAAGPsrwaxr4BAB7D3ZBNlZAf7R5vPWZAu6xVZAD7gq1hdzMOVDsPq3Bsxl2AAojoGlDcQcEAzZAtmyDrOlrwDpOG7N64BTdloH0tDia3OPRb0fRLBXiLKATFMPzRoE0estUT8z6gz7Mb73yBLh3oXXFCt8UmI5fe3pLg0cUi1ZAamY02PZC25OxBYwMKYKMJKlzedF1CmIoh7Iekah5tJQ7';

app.factory('fbvideos', function($http) {
  var base = 'https://graph.facebook.com';

  return {
    getFbVideo: function(eid) {
      var request = '/' + eid + '/feed';
      var url = base + request;
      var config = {
        params: {
          event_id: eid,
          access_token: fbtok,
          filter: 'app_2392950137',
          callback: 'JSON_CALLBACK'
        }
      };
      return $http.jsonp(url, config);
    }
  };
});