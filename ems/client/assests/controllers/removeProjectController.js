myApp.controller("removeProjectController", function($scope, $rootScope, $http) {
    $scope.projects = [];
    $scope.loader=true;

    $scope.getProjects = function() {
        $http.get($rootScope.serverUrl + '/get-projects')
            .then(function(response) {
                $scope.projects = response.data;
            })
            .catch(function(error) {
            });
    }

    $scope.getProjects();

    $scope.removeProject = function() {
        $scope.loader=false;
        const projectId = $scope.project;
        $http.delete($rootScope.serverUrl + '/remove-project/' + projectId)
            .then(function(response) {
                $scope.loader=true;
                $scope.getProjects();
                Swal.fire({
                    title: "Good job!",
                    text: "project removed successfully!",
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
});
