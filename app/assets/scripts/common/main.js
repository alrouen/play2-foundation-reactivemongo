define(["angular", "./helper", "./directives"], function(angular, helper, directives) {

  var user = angular.module("app.common", ["ngResource", "user.services"]);

  user.controller("userTable", userControllers.userTable);
  return user;
});