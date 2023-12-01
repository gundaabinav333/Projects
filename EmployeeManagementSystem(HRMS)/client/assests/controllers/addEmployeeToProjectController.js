myApp.controller("addEmployeeToProjectController",function($scope,$http,$rootScope){
    $scope.project="";
    $scope.employee="";
    $http.post($rootScope.serverUrl+"/add-employeeTo-project")
    .then(function(response){

    }).catch(function(error){
        
    })

    
})