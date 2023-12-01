myApp.controller('addDesignationController', function ($scope, $rootScope, $http) {
    $scope.designationName = "";
    $scope.loader = true;

    $scope.createDesignation = function () {
        $scope.loader = false;

        $http.post($rootScope.serverUrl + "/add-designation", {
            designationName: $scope.designationName
        })
        .then(function (response) {
            $scope.loader = true;
            $scope.designationName = ""; // Corrected variable name
            Swal.fire({
                title: "Good job!",
                text: "Designation created successfully!",
                icon: "success"
            });
        })
        .catch(function (error) {
            $scope.loader = true;

            if (error.status === 500) { // Corrected HTTP status code for validation error
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Designation Already Exists",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong",
                });
            }
        });
    };
});
