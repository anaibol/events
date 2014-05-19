'use strict';

var app = angular.module('wooepa', ['ngRoute', 'ui.bootstrap', 'ui.route', 'wooepa.system', 'wooepa.events', 'restangular', 'ezfb', 'imageupload', 'ngAutocomplete', 'ngTagsInput', 'truncate', 'seo']); // 'leaflet-directive',  'ngCookies', 'ngResource', 'infinite-scroll' 'akoenig.deckgrid'

angular.module('wooepa.system', []);
angular.module('wooepa.events', []);