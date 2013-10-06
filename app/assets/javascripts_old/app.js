define(["angular", "angular-resource", "angular-ui-util", "user", "./directives"], function(angular) {
  var app = angular.module("app", ["ngResource", "ui.utils", "app.user", "directives"]);
  return app;
});
