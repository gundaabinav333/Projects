myApp.controller("login", function ($scope, $http, $httpParamSerializerJQLike,$state) {
  $scope.email = "";
  $scope.password = "";

  const loginStatus = localStorage.getItem("adminId");
    console.log("cdsc");
    console.log(loginStatus != null);
  if (loginStatus != null) {
    console.log("fhwej");
    $state.go("home")
  }

  $scope.login = ($event) => {
    $event.preventDefault();
    let password = $scope.password;
    if ($scope.password.length < 8) {
      $scope.passwordError = "password minimum 8 characters";
      return;
    } else {
      $scope.passwordError = "";
    }

    const userData = {
      email: $scope.email,
      password: $scope.password,
    };
    $http
      .post("./api/login.php", $httpParamSerializerJQLike(userData), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then(
        (response) => {
          const responeData = response.data;
          const status = responeData.status;
          if (status == true) {
            $scope.adminId = response.data.data[0].id;
            localStorage.setItem("adminId", $scope.adminId);
            localStorage.setItem("adminName",response.data.data);
            window.location.replace("./templates/home.html");
          } else {
            $scope.invalidCredentials = "Incorrect username or password";
          }
        },
        (error) => {
          console.log(error);
          console.log("errored out");
        }
      )
      .catch((error) => {
        console.log("api errored out");
      });
  };
});
