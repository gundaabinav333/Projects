


myApp.controller(
  "main",
  function ($scope, $http, $httpParamSerializerJQLike, $state, $location) {
    // $scope.email = "";
    // $scope.password = "";
    $scope.clientName = "";
    $scope.addProduct = "";
    $scope.productPrice = "";
    $scope.addProduct = false;
    $scope.productAdded = "";
    $scope.clientNames = [];
    $scope.products = [];
    $scope.stockDetails = [];
    $scope.selectClientNames = "";
    $scope.selectClient = "selectc";
    $scope.selectProduct = "selectp";
    $scope.transactionType = "selectt";
    $scope.passwordError = "";
    $scope.invalidCredentials = "";
    $scope.clientNameError = "";
    $scope.productNameError="";
    $scope.productPriceError='';
    $scope.adminId='';




    //admin login

    // $scope.login = ($event) => {
    //   $event.preventDefault();
    //   let password = $scope.password;
    //   if ($scope.password.length < 8) {
    //     $scope.passwordError = "password minimum 8 characters";
    //     return;
    //   } else {
    //     $scope.passwordError = "";
    //   }

    //   const userData = {
    //     email: $scope.email,
    //     password: $scope.password,
    //   };
    //   $http
    //     .post("./api/login.php", $httpParamSerializerJQLike(userData), {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //       },
    //     })
    //     .then(
    //       (response) => {
    //         const responeData = response.data;
    //         const status = responeData.status;
    //         if (status == true) {
    //           $scope.adminId=response.data.data[0].id;
    //           localStorage.setItem('adminId',$scope.adminId);
    //           window.location.replace("./templates/home.html");
    //         } else {
    //           $scope.invalidCredentials = "Incorrect username or password";
    //         }
    //       },
    //       (error) => {
    //         console.log(error);
    //         console.log("errored out");
    //       }
    //     )
    //     .catch((error) => {
    //       console.log("api errored out");
    //     });
    // };

    //logout
    $scope.logout=()=>{
      window.localStorage.removeItem("adminId");
      window.location.replace("../index.html");
    }


    //create client 

    $scope.createClient = () => {
      if ($scope.clientName == "") {
        $scope.clientNameError = "Field should not be empty";
        return;
      } else if ($scope.clientName.length<8) {
        $scope.clientNameError = "Client Name should be minimum 8 characters";
        return;
      }
      else{
        $scope.clientNameError = " ";
      }

      const clientName = {
        clientName: $scope.clientName,
      };
      $http
        .post(
          "../api/createClient.php",
          $httpParamSerializerJQLike(clientName),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => {
          document.getElementById("createClient").classList.add("d-none");
          document
            .getElementById("successfullCreation")
            .classList.remove("d-none");
        });
    };

    //addProduct

    $scope.addProductFunction = () => {

      console.log($scope.productName);
      if (typeof $scope.productName === 'undefined' || $scope.productName === null || $scope.productName === '') {
        $scope.productNameError = "Product name should not be empty";
        return;
      } else if ($scope.productName.length < 5) {
        $scope.productNameError = "Product name should be a minimum of 5 characters";
        return;
      } else {
        $scope.productNameError = ""; 
      }
      
      
      if ($scope.productPrice=='') {
        $scope.productPriceError = "product price should not be empty";
        return;
      } else {
        $scope.productPriceError = "";
      }

      const clientName = {
        productName: $scope.productName,
        productPrice: $scope.productPrice,
      };
      $http
        .post("../api/addProduct.php", $httpParamSerializerJQLike(clientName), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          $scope.addProduct = true;
          $scope.productAdded = "Product Added Successfully";
        });
    };

    //client Names
    $scope.getClientNames = () => {
      $http
        .get("../api/getClientNames.php")
        .then(
          (response) => {
            const clientNames = response.data.data;
            for (client of clientNames) {
              $scope.clientNames.push(client);
            }
            console.log($scope.clientNames);
          },
          (error) => {
            console.log("error");
          }
        )
        .catch((error) => {
          console.log("error");
        });
    };

    $scope.getClientNames();

    $http
      .get("../api/getProducts.php")
      .then(
        (response) => {
          const productNames = response.data.data;
          for (product of productNames) {
            $scope.products.push(product.product_name);
          }
        },
        (error) => {
          console.log("error");
        }
      )
      .catch((error) => {
        console.log("error");
      });

    $http
      .get("../api/stockDetails.php")
      .then(
        (response) => {
          const stocks = response.data.data;
          for (item of stocks) {
            $scope.stockDetails.push(item);
          }
          console.log($scope.stockDetails);
        },
        (error) => {
          console.log("error");
        }
      )
      .catch((error) => {
        console.log("error");
      });

     
  }
);
