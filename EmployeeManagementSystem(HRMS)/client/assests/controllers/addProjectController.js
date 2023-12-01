myApp.controller('addProjectController', function($scope, $rootScope, $http) {
    $scope.projectName = "";
    $scope.clientName='';
    $scope.loader = true;

    $scope.createProject = function() {
        $scope.loader = false;
        $http.post($rootScope.serverUrl + "/add-project", {
            projectName: $scope.projectName,
            clientName:$scope.clientName
        }).then(function(response) {
            $scope.loader = true;
            $scope.projectName = "";
            $scope.clientName="";
            Swal.fire({
                title: "Good job!",
                text: "Project created successfully!",
                icon: "success"
            });
        }).catch(function(error) {
            $scope.loader = true;

            if (error.status === 500) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Project Already Exists",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.data.message,
                });
            }
        })
         
      
    };
});
