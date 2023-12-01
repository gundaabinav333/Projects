myApp.controller("addEmployeeController", function ($scope, $rootScope, $http) {
  $scope.departments = [];
  $scope.designations = [];
  $scope.employeeName = "";
  $scope.employeeMobile = "";
  $scope.employeePanCard = "";
  $scope.joiningDate = "";
  $scope.employeeDesignation = "";
  $scope.employeeDepartment = "";
  $scope.employeeEmail = "";
  $scope.employeeSalary = "";
  $scope.loader = true;

  $scope.addEmployee = function () {
    const userData = {
      name: $scope.employeeName,
      mobile: $scope.employeeMobile,
      panCard: $scope.employeePanCard,
      joiningDate: $scope.employeeJoiningDate,
      designation_id: $scope.employeeDesignation,
      department_id: $scope.employeeDepartment,
      email: $scope.employeeEmail,
      salary: $scope.employeeSalary,
    };
    $scope.loader = false;
    $http
      .post($rootScope.serverUrl + "/add-employee", userData)
      .then(function (response) {
        $scope.loader = true;
        $scope.employeeName = "";
        $scope.employeeMobile = "";
        $scope.employeePanCard = "";
        $scope.joiningDate = "";
        $scope.employeeDesignation = "";
        $scope.employeeDepartment = "";
        $scope.employeeEmail = "";
        $scope.employeeSalary = "";
        Swal.fire({
          title: "Good job!",
          text: "Employee created successfully!",
          icon: "success",
        });
      })
      .catch(function (response) {
        console.error("Error:", response);

        $scope.loader = true;
        if (error.data && error.data.errors) {
          let errorMessage = "\n";
          for (let key in error.data.errors) {
            errorMessage += `${key}: ${error.data.errors[key][0]}\n`;
          }
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An unexpected error occurred.",
            icon: "error",
          });
        }
    
      });
  };

  $scope.getDesignations = function () {
    $http
      .get($rootScope.serverUrl + "/get-designations")
      .then(function (response) {
        $scope.designations = response.data;
      })
      .catch(function (error) {});
  };

  $scope.getDepartments = function () {
    $http
      .get($rootScope.serverUrl + "/get-departments")
      .then(function (response) {
        $scope.departments = response.data;
      })
      .catch(function (error) {
        $scope.removeDepartmentStatus = "Something went wrong!";
      });
  };

  $scope.getDesignations();
  $scope.getDepartments();
});
