myApp.controller("salaryDetailsController",function($scope,$http,$rootScope){
    $scope.salaries = [];
        $http.get($rootScope.serverUrl + '/get-salaries')
            .then(function(response) {
                $scope.salaries = response.data.salaries;

            })
            .catch(function(error) {
                console.log('Something went wrong!')
            });
})