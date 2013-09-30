define(["angular", "jsRoutes"], function(angular, jsRoutes) {
  "use strict";

  var mod = angular.module("user.services", []);
  mod.factory("userService", ["$resource", function($resource) {
    return $resource(
        jsRoutes.controllers.UserApi.getAllUsers().url+'/:id',
        {id:'@id'},
        {update: { method: 'PUT'}}
    )
  }]);

  return mod;

});
