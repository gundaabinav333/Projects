myApp.controller("MainController", function ($scope, $rootScope, $http) {
  $rootScope.serverUrl = "http://localhost:8000/api";
  $scope.filter="";
  $scope.adminName=window.localStorage.getItem("name");
  $scope.getDepartments = function () {
    $scope.departments = [];
    $http
      .get($rootScope.serverUrl + "/get-departments")
      .then(function (response) {
        $scope.departments = response.data;
        $scope.departmentsCount = $scope.departments.length;
        console.log($scope.departmentsCount);
      })
      .catch(function (error) {
        $scope.removeDepartmentStatus = "Something went wrong!";
      });
  };
  $scope.getEmployeesList = function () {
    $scope.employees = [];
    $http
      .get($rootScope.serverUrl + "/get-employees")
      .then(function (response) {
        $scope.employees = response.data;
        $scope.employeesCount = $scope.employees.length;
        console.log($scope.employeesCount);
      })
      .catch(function (error) {});
  };

  $scope.getProjects = function () {
    $scope.projects = [];
    $http
      .get($rootScope.serverUrl + "/get-projects")
      .then(function (response) {
        $scope.projects = response.data;
        $scope.projectsCount = $scope.projects.length;
        console.log($scope.departmentsCount);
      })
      .catch(function (error) {});
  };

  $scope.getDepartments();
  $scope.getEmployeesList();
  $scope.getProjects();
  $scope.refresh = function () {
    $scope.getDepartments();
    $scope.getEmployeesList();
    $scope.getProjects();
  };


  $scope.logout=function(){
    window.location.replace("../../client/index/demo/index.html");
  }
});

myApp.directive("loader", function () {
  return {
    template: `
        <div ng-class="{ 'd-none': loader }">
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `,
  };
});
