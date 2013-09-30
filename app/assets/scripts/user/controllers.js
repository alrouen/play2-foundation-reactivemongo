angular.module('user').controller('userTable', function($scope, $q, userService) {

    $scope.newUser = {};
    $scope.editedUser = {};
    $scope.isLoading = false;

    var refresh = function() {
        $scope.isLoading = true;
        userService.query(function(allUsers) {
            $scope.users = allUsers;
            $scope.isLoading = false;
        })
    }

    // we use ui-validate to validate email field. ui-validate support promise, but does not check the returned value in the promise, it's just checking resolve/reject
    // so the check email availability must return :
    // - if(email) => either reject / resolve : depending on the availability of the email
    // - else true : meaning if can't test the email (because undefined), we return true.
    $scope.checkEmailAvailability = function(email) {
        if(email) {
            var deferred = $q.defer();
            userService.get({id: "checkEmail", email : email},
                function(response) {
                    if(response.alreadyExist) { // if already exist, then not available...
                        deferred.reject(false);
                    } else {
                        deferred.resolve(true);
                    }
                },
                function(error) {
                    deferred.reject(false);
                }
            );
            return deferred.promise;
        } else true;  // undefined email is "available", but not valid

    }

    $scope.checkEmailForEditedUser = function(editedEmail, currentUser) {
        if(currentUser.email == editedEmail) {
            return true;
        } else return $scope.checkEmailAvailability(editedEmail);
    }

    $scope.refreshUserTable = function(){refresh()}

    $scope.deleteUser = function(user) {
        if(window.confirm("you're going to remove ["+user.name+"], are you sure ?")) {
            userService.remove({id: user.id},refresh)
        }
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

    $scope.isEdited = function(user) {
        return($scope.editedUser.id == user.id)
    }

    $scope.editUser = function(user) {
        $scope.editedUser = angular.copy(user);
        $scope.editedUser.updatedEmailAvailable = true;
    }

    $scope.commitEdit = function(user) {
        $scope.isLoading = true;
        userService.update({id: user.id}, {name: $scope.editedUser.name.trim(), email: $scope.editedUser.email.trim()},
        function(){
            user.name = $scope.editedUser.name.trim();
            user.email = $scope.editedUser.email.trim();
            $scope.editedUser = {};
            $scope.isLoading = false;
        },
        function(response){
            console.log(error.data);
            $scope.editedUser = {};
            $scope.isLoading = false;
        })
    }

    $scope.cancelEdit = function(user) {
        $scope.editedUser = {};
    }

    refresh();
});