'use strict';

var app = angular.module('wooepa', ['ui.router', 'ui.bootstrap', 'ui.router', 'ezfb', 'restangular', 'ngAutocomplete', 'ngTagsInput', 'truncate', 'ngSanitize', 'angular-data.DS', 'angular-data.DSCacheFactory', 'angularMoment']); //'imageupload', , 'seo' 'leaflet-directive',  'ngCookies', 'ngResource', 'infinite-scroll' 'akoenig.deckgrid'

app.factory('Event', function (DS) {
  return DS.defineResource({
      name: 'event',
      endpoint: '/api/events',
      idAttribute: 'eid',
    });
});
 
// app.factory('eventsManager', ['$http', '$q', 'Event', function($http, $q, Event) {
//     var events = [];

//     var eventsManager = {
//         get: function(eid) {
//           for (var i = events.length - 1; i >= 0; i--) {
//             if (events[i].eid === eid) {
//               return events[i];
//             }
//           };
//         },
//         getAll: function() {
//           return events;
//         },
//         set: function(eid, ev) {
//           for (var i = events.length - 1; i >= 0; i--) {
//             if (events[i].eid === eid) {
//               return events[i] = ev;
//             }
//           };
//         },
//         setAll: function(evs) {
//           events = evs;
//         },

//     };

//     return eventsManager;
// }]);