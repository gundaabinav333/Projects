myApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: "createClient",
      url: "/createClient",
      templateUrl: "./createClient.html",
      controller: "main",
    })
    .state({
      name: "addProduct",
      url: "/addProduct",
      templateUrl: "./addProduct.html",
      controller: "main",
    })
    .state({
      name: "manageOutwards",
      url: "/manageOutwards",
      templateUrl: "./manageOutwards.html",
      controller: "main",
    })
    .state({
      name: "stockDetails",
      url: "/stockDetails",
      templateUrl: "./stockDetails.html",
      controller: "main",
    })
    .state({
      name: "transactionDetails",
      url: "/transactionsDetails",
      templateUrl: "./transactionDetails.html",
      controller: "main",
    })
    .state({
      name: "home",
      url: "/home",
      templateUrl: "./templates/home.html",
      controller: "login",
    });

  $urlRouterProvider.otherwise("/");
});
