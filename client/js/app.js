var app = angular.module('wooepa', ['wooepa-templates', 'ngStorage', 'bootstrapLightbox', 'mb-adaptive-backgrounds', 'querystring', 'ui.router', 'ui.bootstrap', 'ezfb', 'truncate', 'ngSanitize', 'angular-data.DSCacheFactory', 'angularMoment', 'gettext', 'infinite-scroll', 'headroom']); //'imageupload', , 'seo' 'leaflet-directive', 'geolocation'
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);
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