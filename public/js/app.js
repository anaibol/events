'use strict';

var app = angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.events', 'leaflet-directive', 'restangular', 'ezfb', 'ngTable', 'ui.bootstrap.datetimepicker', 'imageupload']); //'infinite-scroll'

angular.module('mean.system', []);
angular.module('mean.events', []);