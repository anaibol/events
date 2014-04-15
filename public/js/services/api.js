angular.module('mean')
  .factory('Api',  function (Restangular, $q) {

    return function(entityNames) {
      entityNames.forEach(function (entityName){
        
        var Rest = Restangular.all(entityName + 's');

        formatted = format(entityName);

        window[formatted] = {
          create: function (obj) {
            return Rest.post(obj);
          },
          get: function (filter) {
            // if (window.evs) {
            //   var def = $q.defer();
            //   def.resolve(window.evs);
            //   return def;
            // }
            return Rest.getList(filter);
          },
          update: function (obj) {
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