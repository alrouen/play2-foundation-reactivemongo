angular.module('user').controller('userTable', function($scope, userService) {

    $scope.newUser = { };
    $scope.userOnEdit = undefined;
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
        if(window.confirm("you're going to remove ["+user.name+"], are you sure ?")) {
            userService.remove({id: user.id},refresh)
        }
    }

    $scope.setEmailAvailability = function(email) {
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

    $scope.editUser = function(user) {
        $scope.userOnEdit = user;
    }

    $scope.commitEdit = function() {
        $scope.userOnEdit = undefined;
    }

    $scope.rollbackEdit = function() {
        $scope.userOnEdit = undefined;
    }

    $scope.update = function(user) {
        userService.update({id: user.id}, {name: user.name, email: user.email}, refresh)
    }

    refresh();
});