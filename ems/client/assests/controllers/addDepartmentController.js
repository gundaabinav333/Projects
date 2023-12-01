myApp.controller('addDepartmentController', function($scope, $rootScope, $http) {
    $scope.departmentName = "";
    $scope.departmentCreationStatus = "";
    $scope.loader = true;

    $scope.createDepartment = function() {
        $scope.loader = false;
        $http.post($rootScope.serverUrl + "/add-department", {
            departmentName: $scope.departmentName
        }).then(function(response) {
            $scope.loader = true;
            $scope.departmentName = "";
            Swal.fire({
                title: "Good job!",
                text: "Department created successfully!",
                icon: "success"
            });
        }).catch(function(error) {
            $scope.loader = true;

            if (error.status === 500) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Department Already Exists",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong",
                });
            }
        })
         
      
    };
});
