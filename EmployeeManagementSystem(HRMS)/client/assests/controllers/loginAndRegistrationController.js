myApp.controller(
  "loginAndRegistrationController",
  function ($scope, $http, $rootScope) {
    $scope.serverUrl = "http://localhost:8000/api";
    $scope.loader=true;
    $scope.name = "";
    $scope.email = "";
    $scope.password = "";
    $scope.mobile = "";
    $scope.userEmail = "gundaabinav333@gmail.com";
    $scope.userPassword = "Abhi@1999";

    $scope.register = function () {
      $scope.loader=false;
      var userData = {
        name: $scope.name,
        mobile: $scope.mobile,
        email: $scope.email,
        password: $scope.password,
      };

      $http
        .post($scope.serverUrl + "/register", userData)
        .then(function (response) {
          $scope.loader=true;
          $scope.email='';
          $scope.password='';
          $scope.name='';
          $scope.mobile='';
          Swal.fire({
            title: "Good job!",
            text: "Registration successful!",
            icon: "success",
          });
        })
        .catch(function (error) {
          $scope.loader = true;
          if (error.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email Already Exists Try Another One!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.data.message,
            });
          }
        });
    };

    $scope.login = function () {
      $scope.loader=false;
      
      var userData = {
        email: $scope.userEmail,
        password: $scope.userPassword,
      };

      $http
        .post($scope.serverUrl + "/login", userData)
        .then(function (response) {
          const token = response.data.authorization.token;
          const name = response.data.user.name;
          localStorage.setItem("token", token);
          localStorage.setItem("name", name);
          window.location.replace("../../templates/home.html");
          $scope.loader=true;
        })
        .catch(function (error) {
          if (error.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid email or password",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
            });
          }
          $scope.loader=true;
        });
    };
  }
);
