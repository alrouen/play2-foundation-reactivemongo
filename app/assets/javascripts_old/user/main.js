define(["angular", "./controllers", "./services"], function(angular, userControllers) {
  var user = angular.module("app.user", ["ngResource", "user.services"]);

  user.controller("userTable", userControllers.userTable);

  return user;
});