myApp.controller("tran", function ($scope, $http) {
  $scope.transactionInformation = [];
  $scope.viewDetails = "View Details";

  $http.get("../api/transactions.php").then((response) => {
    
    const transactionFirstArray=response.data.data.transactions;
    console.log(transactionFirstArray);
    for (item of transactionFirstArray) {
        $scope.transactionInformation.push(item);
    }
    console.log("hii");
    console.log($scope.transactionInformation);
  })
});
