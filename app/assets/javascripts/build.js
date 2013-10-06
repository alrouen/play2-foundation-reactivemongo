requirejs.config({
    shim: {
        "jquery": { exports: "$" },
        "angular" : { exports : "angular" }
    },
    paths: {
        "jquery": "empty:",
        "angular": "//ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min"
    }
});