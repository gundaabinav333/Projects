myApp.controller("removeDepartmentController", function($scope, $rootScope, $http) {
    $scope.departments = [];
    $scope.loader=true;

    $scope.getDepartments = function() {
        $http.get($rootScope.serverUrl + '/get-departments')
            .then(function(response) {
                $scope.departments = response.data;
            })
            .catch(function(error) {
                $scope.removeDepartmentStatus = "Something went wrong!";
            });
    }

    $scope.getDepartments();

    $scope.removeDepartment = function() {
        $scope.loader=false;
        const departmentId = $scope.department;
        $http.delete($rootScope.serverUrl + '/remove-department/' + departmentId)
            .then(function(response) {
                $scope.loader=true;
                $scope.departments="";
                Swal.fire({
                    title: "Good job!",
                    text: "Department removed successfully!",
                    icon: "success"
                  });
            })
            .catch(function(error) {
                $scope.loader=true;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    });
            });
    };
    $scope.getDepartments();

});
