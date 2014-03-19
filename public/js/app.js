'use strict';

var app = angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.events', 'leaflet-directive', 'restangular', 'ezfb', 'ngTable', 'imageupload', 'ngAutocomplete']); //'infinite-scroll'

angular.module('mean.system', []);
angular.module('mean.events', []);