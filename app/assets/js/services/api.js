app.factory('Api',  function (Restangular, $q) {
  return function(entityNames) {
    entityNames.forEach(function (entityName){
      
      var Rest = Restangular.all(entityName + 's');

      var entity = format(entityName);

      window[entity] = {
        post: function (data) {
          return Rest.post(data);
        },
        get: function (filter) {
          // if (window.evs) {
          //   var def = $q.defer();
          //   def.resolve(window.evs);
          //   return def;
          // }
          return Rest.getList(filter);
        },
        one: function (slug) {
          // if (window.evs) {
          //   var def = $q.defer();
          //   def.resolve(window.evs);
          //   return def;
          // }
          return Rest.get(slug);
        },
        put: function (obj) {
          return Rest.one(obj._id).customPUT(obj);
        },
        delete: function (obj) {
          return Rest.one(obj._id).delete();
        }
      };
    });
  };

  function format(string) {
    return string.charAt(0).toUpperCase() + string.slice(1) + 's';
  }
});