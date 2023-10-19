myApp.controller(
  "manage",
  function ($scope, $http, $httpParamSerializerJQLike) {
    $scope.transactionType = "selectTransaction";
    $scope.quantity = 0;
    $scope.selectProduct = "selectProduct";
    $scope.selectProductError = "";
    $scope.selectClient = "selectClient";
    $scope.availableQuantity = "";
    $scope.selectTransactionTypeError = "";
    $scope.selectClientError = "";
    $scope.createClient = false;
    $scope.manageStatus = "";
    $scope.quantityError = "";
    const adminId = window.localStorage.getItem("adminId");
    $scope.product_id = "";

    $scope.manageStocks = () => {
      let type = $scope.transactionType;

      if ($scope.selectProduct == "selectProduct") {
        $scope.selectProductError = "Please select the product ";
        return;
      }

      if ($scope.transactionType == "selectTransaction") {
        $scope.selectTransactionTypeError = "Please select transaction type";
        return;
      }

      if ($scope.selectClient == "selectClient") {
        $scope.selectClientError = "Please select the client ";
        return;
      }

      // if (type != "intake") {
      //   if ($scope.quantity > $scope.availableQuantity) {
      //     $scope.quantityError =
      //       "Please Enter the quantity less than or equal to available quantity";
      //     return;
      //   }
      // }

      const userData = {
        type: type,
        product_quantity: $scope.quantity,
        product_name: $scope.selectProduct,
        clientName: $scope.selectClient,
        adminId: adminId,
        product_id: $scope.product_id,
      };

      if (type === "intake") {
        $http
          .post(
            "../api/stockIntake.php",
            $httpParamSerializerJQLike(userData),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(
            (response) => {
              const responeData = response.data;
              const status = responeData.status;
              if (status === true) {
                console.log("Stock intake successful");
                $scope.createClient = true;
                $scope.manageStatus = "Stock Managed Successfully";
              }
            },
            (error) => {
              console.log("Stock intake errored out");
            }
          )
          .catch((error) => {
            console.log("API errored out");
          });
      } else {
        $http
          .post(
            "../api/stockOutward.php",
            $httpParamSerializerJQLike(userData),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(
            (response) => {
              const responeData = response.data;
              const status = responeData.status;
              if (status === true) {
                $scope.createClient = true;
                $scope.manageStatus = "Stock Managed Successfully";
              } else{
                $scope.quantityError=response.data.message;
              }
            },
            (error) => {
              console.log(error);
              console.log("Stock outward errored out");
            }
          )
          .catch((error) => {
            console.log("API errored out");
          });
      }
    };

    $scope.getQuantity = () => {
      const productData = {
        product_name: $scope.selectProduct,
      };

      $http
        .post(
          "../api/getProductId.php",
          $httpParamSerializerJQLike(productData),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(
          (response) => {
            const responeData = response.data;
            const status = responeData.status;
            if (status === true) {
              $scope.product_id = response.data.data[0].id;
            }
          },
          (error) => {
            console.log(error);
            console.log("Stock outward errored out");
          }
        )
        .catch((error) => {
          console.log("API errored out");
        });

      const quantity = { name: $scope.selectProduct };

      $http
        .post("../api/getQuantity.php", $httpParamSerializerJQLike(quantity), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          $scope.availableQuantity = response.data.data[0].product_quantity;
        });
    };
  }
);
