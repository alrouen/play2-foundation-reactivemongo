angular.module('user').factory('userService', function ($resource) {

    /* when using absoluteURL the port semicolon must be escape */
    //var pattern = /^.*:\/\/[a-z\-.]+(:[0-9]+)?.*$/gi
    //var url = jsRoutes.controllers.UserApi.getAllUsers().absoluteURL(false).replace(pattern, "$1\\\\$2$3")

    return $resource(
        jsRoutes.controllers.UserApi.getAllUsers().url+'/:id', //TODO: do we have to use the js reverse routing?
        {id:'@id'},
        {update: { method: 'PUT'}}
    )
});
