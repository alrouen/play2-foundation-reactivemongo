(function(requirejs) {
  "use strict";

  requirejs.config({
    packages: ["user"],
    shim: {
        "jquery": {
            exports: "$"
        },

        "jsRoutes" : {
            deps : [],
            // it's not a RequireJS module, so we have to tell it what var is returned
            exports : "jsRoutes"
        },

        "angular" : {
            exports : "angular",
            deps: ["jquery"]
        },
        "angular-resource": ["angular"],
        "angular-ui-util": ["angular"],
        "app": ["angular"],
        "foundation": {
            deps: ["jquery"]
        },
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
        "jquery": "//code.jquery.com/jquery-1.10.2.min",
        "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min",
        "angular-resource": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular-resource.min",
        "angular-ui-util": "/assets/javascripts/angular-ui-utils.min",
        "jsRoutes": "/assets/javascripts/routes",
        //"common": "/assets/scripts/helper",
        "foundation": "/assets/foundation/js/foundation/foundation",
        "foundation.alerts": "/assets/foundation/js/foundation/foundation.alerts",
        "foundation.clearing": "/assets/foundation/js/foundation/foundation.clearing",
        "foundation.cookie": "/assets/foundation/js/foundation/foundation.cookie",
        "foundation.dropdown": "/assets/foundation/js/foundation/foundation.dropdown",
        "foundation.forms": "/assets/foundation/js/foundation/foundation.forms",
        "foundation.interchange": "/assets/foundation/js/foundation/foundation.interchange",
        "foundation.joyride": "/assets/foundation/js/foundation/foundation.joyride",
        "foundation.magellan": "/assets/foundation/js/foundation/foundation.magellan",
        "foundation.orbit": "/assets/foundation/js/foundation/foundation.orbit",
        "foundation.placeholder": "/assets/foundation/js/foundation/foundation.placeholder",
        "foundation.reveal": "/assets/foundation/js/foundation/foundation.reveal",
        "foundation.section": "/assets/foundation/js/foundation/foundation.section",
        "foundation.tooltips": "/assets/foundation/js/foundation/foundation.tooltips",
        "foundation.topbar": "/assets/foundation/js/foundation/foundation.topbar"
    },
    priority: ["angular"]
  });

  requirejs.onError = function(err) {
    console.log(err);
  };

  require(["angular", "app", "angular-resource", "angular-ui-util", "jsRoutes", "jquery",
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
        $(document).foundation();
        angular.bootstrap(document , ['app']);
    });

})(requirejs);