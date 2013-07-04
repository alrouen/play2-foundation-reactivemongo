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

    $scope.deleteUser = function(id) {
        /*
        userService.remove(id,refreshUserTable())
        */
    }

    $scope.updateUser = function(user) {
        userService.update({id: user.id}, {name: user.name, email: user.email}, refresh)
    }

    refresh();
});