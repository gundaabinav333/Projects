myApp.controller("updateSalaryController", function ($scope, $http, $rootScope) {
    $scope.employees = [];
    $scope.loader = true;
    $scope.employeeId = "";
    $scope.salary = "";

    $scope.getEmployees = function () {
        $http.get($rootScope.serverUrl + '/get-employees')
            .then(function (response) {
                $scope.employees = response.data;
            })
            .catch(function (error) {
            });

    }

    $scope.getEmployees();

    $scope.updateSalary = function () {
        $scope.loader = false;
        const employeeId = $scope.employeeId;
        const salary = $scope.salary;
        $http.put($rootScope.serverUrl + '/update-salary/' + employeeId, { salary: salary })
            .then(function (response) {
                $scope.loader = true;
                $scope.salary='';
                $scope.employeeId='';
                $scope.getEmployees();
                Swal.fire({
                    title: "Good job!",
                    text: "Salary Updated successfully!",   
                    icon: "success"
                });
            })
            .catch(function (error) {
                $scope.loader = true;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };
});
