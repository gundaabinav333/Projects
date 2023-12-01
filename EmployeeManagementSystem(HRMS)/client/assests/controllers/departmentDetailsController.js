myApp.controller("departmentDetailsController",function($scope,$http,$rootScope){
    $scope.departments = [];
        $http.get($rootScope.serverUrl + '/get-departments')
            .then(function(response) {
                $scope.departments = response.data;
            })
            .catch(function(error) {
                $scope.removeDepartmentStatus = "Something went wrong!";
            });
    

})