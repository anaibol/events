app.factory('Event', function($q, $http, DSCacheFactory, $rootScope, $querystring) {
  var cache = DSCacheFactory('eventCache');

  var query = {};

  return {
    query: query,
    getOne: function(eid) {
      var that = this;

      if (cache.get(eid)) {
        return cache.get(eid);
      }

      var deferred = $q.defer();

      $http.get('/api/events/' + eid).success(function(ev) {
        ev = that.normalize(ev);
        deferred.resolve(ev);
      });

      return deferred.promise;
    },
    get: function(params) {
      // console.log(query.since));
      query = {
        since: params.since || getStringDate($rootScope.today),
        country: params.country || query.country,
        lng: $rootScope.loc.lng || query.lng,
        lat: $rootScope.loc.lat || query.lat,
        tags: params.tags || query.tags,
        sortBy: params.sortBy || query.sortBy
      };

      // console.log(query);

      return this.runQuery();
    },
    getMore: function() {
      var limit;

      if ($rootScope.isMobile) {
        limit = 5;
      } else {
        limit = 30;
      }

      if (!query.skip) {
        query.skip = limit;
      } else {
        query.skip += limit;
      }

      return this.runQuery();
    },
    normalize: function(ev) {
      if (ev.attending_count >= 99) {
        ev.tags.push('popular');
      }

      if (ev.price) {
        if (ev.price.num === 0) {
          ev.tags.push('free');
        }
      }

      if (ev.festival) {
        ev.tags.push('festival');
      }

      ev.tags = _.uniq(ev.tags);

      ev.start_time = this.parseDate(ev.start_time, ev.timezone);
      ev.end_time = this.parseDate(ev.end_time, ev.timezone);
      ev.update_time = this.parseDate(ev.update_time, ev.timezone);

      return ev;
    },
    parseDate: function(date, tz) {
      if (!tz) {
        return date;
      }
      var parsed = moment(date).tz(tz).format("YYYY/MM/DD hh:mm A");
      return new Date(parsed);
    },
    runQuery: function() {
      var that = this;
      var deferred = $q.defer();

      $http.get('/api/events?' + $querystring.toString(_.compactObject(query))).success(function(evs) {
        var ev = {};

        for (var i = evs.length - 1; i >= 0; i--) {
          ev = evs[i];
          ev = that.normalize(ev);

          cache.put(ev.eid, ev);
        }

        deferred.resolve(evs);
      });

      return deferred.promise;
    },
    
  };
});