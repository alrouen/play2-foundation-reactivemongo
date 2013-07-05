angular.module('user').controller('userTable', function($scope, userService) {

    $scope.newUser = {};
    $scope.isLoading = false;

    var refresh = function() {
        $scope.isLoading = true;
        userService.query(function(allUsers) {
            $scope.users = allUsers;
            setTimeout(function(){
                $scope.$apply(function(){$scope.isLoading = false;})
            },1000);

        })
    }

    $scope.refreshUserTable = function(){refresh()}

    $scope.deleteUser = function(user) {
        if(window.confirm("are you sure ?")) {
            userService.remove({id: user.id},refresh)
        }
    }

    $scope.checkEmail = function(email) {
        console.log(email)
        return true;
    }

    $scope.createUser = function(user) {
        userService.save(user,
            function(){
                $scope.newUser = {};
                refresh();
            },
            function(response){
                console.log(response.data)
            }
        )
    }

    $scope.update = function(user) {
        userService.update({id: user.id}, {name: user.name, email: user.email}, refresh)
    }

    refresh();
});