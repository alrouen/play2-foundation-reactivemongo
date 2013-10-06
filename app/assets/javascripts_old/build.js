(function(requirejs) {
  "use strict";

  requirejs.config({
    packages: ["user"],
    shim: {
        "helper": {
            deps: ["jquery"],
            exports: "helper"
        },
        "jsRoutes" : {
            deps : [],
            exports : "jsRoutes"
        },
        "angular" : {
            exports : "angular",
            deps: []
        },
        "angular-resource": ["angular"],
        "angular-ui-util": ["angular"],
        "app": ["angular"],
        "foundation.alerts": {
            deps: ["foundation"]
        },
        "foundation.clearing": {
            deps: ["foundation"]
        },
        "foundation.cookie": {
            deps: ["foundation"]
        },
        "foundation.dropdown": {
            deps: ["foundation"]
        },
        "foundation.forms": {
            deps: ["foundation"]
        },
        "foundation.interchange": {
            deps: ["foundation"]
        },
        "foundation.joyride": {
            deps: ["foundation"]
        },
        "foundation.magellan": {
            deps: ["foundation"]
        },
        "foundation.orbit": {
            deps: ["foundation"]
        },
        "foundation.placeholder": {
            deps: ["foundation"]
        },
        "foundation.reveal": {
            deps: ["foundation"]
        },
        "foundation.section": {
            deps: ["foundation"]
        },
        "foundation.tooltips": {
            deps: ["foundation"]
        },
        "foundation.topbar": {
            deps: ["foundation"]
        }
    },
    paths: {
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
        "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min",
        "angular-resource": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular-resource.min",
        "jsRoutes": "http://localhost:9000/assets/javascripts/routes",
        "helper": "helper",
        "foundation": "../foundation/js/foundation/foundation",
        "foundation.alerts": "../foundation/js/foundation/foundation.alerts",
        "foundation.clearing": "../foundation/js/foundation/foundation.clearing",
        "foundation.cookie": "../foundation/js/foundation/foundation.cookie",
        "foundation.dropdown": "../foundation/js/foundation/foundation.dropdown",
        "foundation.forms": "../foundation/js/foundation/foundation.forms",
        "foundation.interchange": "../foundation/js/foundation/foundation.interchange",
        "foundation.joyride": "../foundation/js/foundation/foundation.joyride",
        "foundation.magellan": "../foundation/js/foundation/foundation.magellan",
        "foundation.orbit": "../foundation/js/foundation/foundation.orbit",
        "foundation.placeholder": "../foundation/js/foundation/foundation.placeholder",
        "foundation.reveal": "../foundation/js/foundation/foundation.reveal",
        "foundation.section": "../foundation/js/foundation/foundation.section",
        "foundation.tooltips": "../foundation/js/foundation/foundation.tooltips",
        "foundation.topbar": "../foundation/js/foundation/foundation.topbar"
    },
    priority: ["angular"]
  });



  /*define("angular-ui-util", ["angular", "angular-resource", "jquery"], function(angular, resource, $){
    require(['./angular-ui-utils'], function() {});
  });  */

  requirejs.onError = function(err) {
    console.log(err);
  };

  define("foundation",['jquery'], function ($) {
      require(['/foundation'], function () {
      });
    });

  require(["angular", "app", "angular-resource", "angular-ui-util", "jquery",
           "../foundation/js/foundation/foundation",
           "foundation.alerts",
           "foundation.clearing",
           "foundation.cookie",
           "foundation.dropdown",
           "foundation.forms",
           "foundation.interchange",
           "foundation.joyride",
           "foundation.magellan",
           "foundation.orbit",
           "foundation.placeholder",
           "foundation.reveal",
           "foundation.section",
           "foundation.tooltips",
           "foundation.topbar"
  ], function(angular, app) {
        angular.bootstrap(document , ['app']);
        $(document).foundation();
    });

})(requirejs);