angular.module('user').controller('userTable', function($scope, userService) {

    $scope.newUser = { };
    $scope.isLoading = false;
    //$scope.newUserForm.$setValidity("emailAlreadyExist", false);

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
        if(window.confirm("you're going to remove ["+user.name+"], are you sure ?")) {
            userService.remove({id: user.id},refresh)
        }
    }

    $scope.checkEmail = function(email) {
        userService.get({id: "checkEmail", email : email},
            function(response){
                if(response.alreadyExist) {
                    $scope.newUserForm.email.$setValidity("emailAvailable", false);
                } else {
                    $scope.newUserForm.email.$setValidity("emailAvailable", true);
                }

            },
            function(error){
                console.log(error.data);
            }
        );
        return true;
    }

    $scope.createUser = function(user) {
        userService.save(user,
            function(){
                $scope.newUser = {};
                refresh();
            },
            function(error){
                console.log(error.data)
            }
        )
    }

    $scope.update = function(user) {
        userService.update({id: user.id}, {name: user.name, email: user.email}, refresh)
    }

    refresh();
});