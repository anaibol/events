'use strict';

var app = angular.module('mean', ['ngRoute', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.events', 'restangular', 'ezfb', 'imageupload', 'ngAutocomplete', 'ngTagsInput']); // 'leaflet-directive',  'ngCookies', 'ngResource', 'infinite-scroll' 'akoenig.deckgrid'

angular.module('mean.system', []);
angular.module('mean.events', []);