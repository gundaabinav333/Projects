myApp.controller("removeEmployeeController", function($scope, $rootScope, $http) {
    $scope.employees = [];
    $scope.loader=true;

    $scope.getEmployees = function() {
        $http.get($rootScope.serverUrl + '/get-employees')
            .then(function(response) {
                $scope.employees = response.data;
            })
            .catch(function(error) {
            });
    }

    $scope.getEmployees();

    $scope.removeEmployee = function() {
        $scope.loader=false;
        const employeeId = $scope.employee;
        $http.delete($rootScope.serverUrl + '/remove-employee/' + employeeId)
            .then(function(response) {
                $scope.loader=true;
                $scope.employee="";
                Swal.fire({
                    title: "Good job!",
                    text: "Employee removed successfully!",
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
    $scope.getEmployees();

});
