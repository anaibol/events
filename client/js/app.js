var app = angular.module('wooepa', ['wooepa-templates', 'ngStorage', 'querystring', 'ui.router', 'ui.bootstrap', 'truncate', 'ngTouch', 'ngSanitize', 'angular-data.DSCacheFactory', 'angularMoment', 'rt.encodeuri', 'offClick', 'QuickList', 'ezfb']); //'imageupload', , 'seo' 'leaflet-directive', 'geolocation' ,  'gettext', 

var getStringDate = function(date) {
  var dd = date;
  var yy = dd.getYear();
  var mm = dd.getMonth() + 1;
  dd = dd.getDate();
  if (yy < 2000) {
    yy += 1900;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  var rs = yy + "-" + mm + "-" + dd;
  return rs;
};