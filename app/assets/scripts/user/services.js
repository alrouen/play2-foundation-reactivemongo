angular.module('user').factory('userService', function ($resource) {
    return $resource(
        jsRoutes.controllers.UserApi.getAllUsers().url+'/:id', //TODO: do we have to use the js reverse routing?
        {id:'@id'},
        {update: { method: 'PUT'}}
    )
});
