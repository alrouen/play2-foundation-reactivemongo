(function(requirejs) {
    "use strict";

    requirejs.config({
      shim: {
        "jquery": { exports: "$" },
        "angular" : { exports : "angular" }
      },
      paths: {
        "jquery": "//code.jquery.com/jquery-1.10.2.min",
        "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min"
      },
      priority: ["angular"]
    });

    requirejs.onError = function(err) {
        console.log(err);
    };

    requirejs(['jquery', 'angular'], function ($, angular) {
        console.log($('body'));
        console.log(angular);
    });

})(requirejs);