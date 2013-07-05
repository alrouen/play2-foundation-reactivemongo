
var myapp = angular.module('myapp', ['user', 'ngResource']);
angular.module('user', []);
myapp.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.bind('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });

      // model -> view
      ctrl.$render = function(value) {
        elm.html(value);
      };

      // load init value from DOM
      //ctrl.$setViewValue(elm.html());
    }
  };
});

myapp.directive('mustMatch', function(){
  return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elm, attrs, ctrl) {

          ctrl.$parsers.unshift(function(viewValue) {

              var newPassword = scope.$eval(attrs.mustMatch)

              if(newPassword && newPassword == viewValue) {
                  ctrl.$setValidity('mustMatch', true);
              } else {
                  ctrl.$setValidity('mustMatch', false);
              }

              return viewValue;
          });

          scope.$watch(attrs.mustMatch, function() {
              ctrl.$setViewValue(ctrl.$viewValue);
          });
      }
  }
});
