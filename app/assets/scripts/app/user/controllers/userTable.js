angular.module('user').controller('userTable', function($scope, userService) {

    $scope.newUser = undefined;
    $scope.isLoading = false;

    var refresh = function() {
        $scope.isLoading = true;
        userService.query(function(allUsers) {
            $scope.users = allUsers;
            $scope.isLoading = false;
        })
    }

    $scope.refreshUserTable = function(){refresh()}

    $scope.deleteUser = function(user) {
        userService.remove({id: user.id},refresh)
    }

    $scope.createUser = function(user) {
        userService.save(user,refresh)
    }

    $scope.updateUser = function(user) {
        userService.update({id: user.id}, {name: user.name, email: user.email}, refresh)
    }

    refresh();
});