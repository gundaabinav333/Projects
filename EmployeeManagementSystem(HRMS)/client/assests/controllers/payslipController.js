myApp.controller('payslipController',function($rootScope,$scope,$http){
    $scope.empName='';
    $scope.empId='';
    $scope.travelAllowance='';
    $scope.houseAllowance='';
    $scope.tax='';
    $scope.providentFund=''
    $scope.bonus='';
    $scope.month='';

    $scope.getEmployees = function() {
        $http.get($rootScope.serverUrl + '/get-employees')
            .then(function(response) {
                $scope.employees = response.data;

            })
            .catch(function(error) {
            });
    }
    $scope.getEmployees();

    $scope.getSalary = function() {
        const employeeId = $scope.empId;
        $http.get($rootScope.serverUrl + '/employee-salary/' + employeeId)
            .then(function(response) {
                const perMonthSalary=response.data.data.salary/12;
                $scope.basicPay=perMonthSalary-(response.data.data.salary/12)*10/100;
                $scope.travelAllowance=perMonthSalary*5/100;
                $scope.houseAllowance=perMonthSalary*5/100;
                $scope.providentFund=perMonthSalary*7/100;
                $scope.tax=perMonthSalary*5/100;
            
            })
            .catch(function(error) {
            });
    };

    $scope.generatePayslip=function(){
        const payslipData={
            empId:$scope.empId,
            basicPay:$scope.basicPay,
            rentAllowance:$scope.houseAllowance,
            travelAllowance:$scope.travelAllowance,
            providentFund:$scope.providentFund,
            tax:$scope.tax,
            month_id:$scope.month,
            bonus:$scope.bonus
        };


        $http.post($rootScope.serverUrl+'/generate-pay-slip',payslipData)
        .then(function(response){

        })
        .catch(function(error){

        })
    }

    $scope.printPayslip = function () {
        const paySlipData = {
            empId:$scope.empId,
            month: $scope.month
        };
    
        $http.post($rootScope.serverUrl+'/pay-slip', paySlipData)
            .then(function (response) {
                $scope.payslip=response.data;
                console.log($scope.payslip.id,"id");
                var payslipDiv = document.getElementById('paySlipDivision');
    
                if (payslipDiv) {
                    // Update the payslipDiv content with the fetched data
                    // Example: payslipDiv.innerHTML = '<p>Employee Name: ' + $scope.payslip.name + '</p>...';
    
                    // After updating the content, trigger the print
                    window.print();
                } else {
                    console.error('Payslip division not found');
                }
            })
            .catch(function (error) {
                console.error('Error fetching payslip data:', error);
            });
    };
    
});