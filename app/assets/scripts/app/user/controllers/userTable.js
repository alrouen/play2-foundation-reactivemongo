angular.module('user').controller('userTable', function($scope, userService) {

    $scope.newUser = undefined;
    $scope.isLoading = false;

    $scope.refreshUserTable = function() {
        $scope.isLoading = true;
        userService.query(function(allUsers) {
            $scope.users = allUsers;
            $scope.isLoading = false;
        })
    }

    $scope.refreshUserTable();
});