myApp.controller("removeDesignationController", function($scope, $rootScope, $http) {
    $scope.designations = [];
    $scope.loader=true;

    $scope.getDesignations= function() {
        $http.get($rootScope.serverUrl + '/get-designations')
            .then(function(response) {
                $scope.designations = response.data;
            })
            .catch(function(error) {
            });
    }

    $scope.getDesignations();

    $scope.removeDesignation = function() {
        $scope.loader=false;
        const designationId = $scope.designation;
        $http.delete($rootScope.serverUrl + '/remove-designation/' + designationId)
            .then(function(response) {
                $scope.loader=true;
                $scope.getDesignations();
                Swal.fire({
                    title: "Good job!",
                    text: "Designation removed successfully!",
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
