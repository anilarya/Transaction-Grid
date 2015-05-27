'use strict';

/**
 * @ngdoc service
 * @name payUApp.dashboard
 * @description
 * # dashboard
 * Factory in the payUApp.
 */
angular.module('payUApp')
  .factory('dashboard', function ($http, $log ) {
    // Service logic
    // ...
    return { 
        fetchTransactionData: function () {  
                var url = '/data/transaction.json';  //Your own Rest APIs 
                
                var promise = $http({
                    url :url,
                    method : "GET",
                    format : "json", 
                }).success(function (result) { 
                    console.log("result data", result)
                }).error(function (err) {
                        console.log(err);
                });

                return promise;
            },
    }
 
  });
