'use strict';

/**
 * @ngdoc function
 * @name payUApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the payUApp
 */
angular.module('payUApp')
  .controller('DashboardCtrl', function ($scope, $cookies,$cookieStore,$rootScope, $state, $location, dashboard) {
    
  	$scope.widgets = {};


    $scope.creativeGridOptions = {
            dataSource: {  
                data: [] , //  data to be rendered into grid
            }, 
            pageable : {pageSizes : [2, 4, 6, 8, 10, 12, 14, 15, 20 , 50]}, // providing pagination
            sortable: {
                mode: "single",  //sorting based on single column 
                allowUnsort: false
            },
            selectable: "single, row", // rows wise selection feture
            filterable: {
                            mode: "row"
                        },   // Enabling filteing column wise
            scrollable:true, //  enabling scolling length of column header
            columnMenu: true,  // enabling column menu
            groupable: true,  // Enabling grouping of data based on selection of particular column
            columns: [    // definition of columns in grid
                      {field : "paymentId", title :"Payment Id", filterable:false},
                      {field : "orderDate", title :"Order Date",filterable:false, format : "{0:dd-MMM-yyyy}"},
                      {field : "merchatId", title :"Merchat Id",filterable:false ,sortable: false},
                      {field : "customerEmail", title :"Customer Email",filterable:false,sortable: false},
                      {field : "amount", title :"Amount",filterable:false},
                      {field : "paymentStatus", title :"Payment Status",filterable: {cell:{ operator: "contains"}},sortable: false},

            
            ] 
        }


    $scope.$on("kendoWidgetCreated", function(event, widget){  // event which looks over initialization of grid widget
            if (widget === $scope.widgets.transactionGrid) {
                fetchTransactionData(); // calling JSON APIs to render grid
            } 
        }); 


    var fetchTransactionData = function(){
      if(!$scope.widgets.transactionGrid) {
                return false;
            }
      var dataSource = new kendo.data.DataSource({    // data source to be filled from JSON A
            transport: {
                read: function(options) { 
                    dashboard.fetchTransactionData().success(function (results) { // calling Rest API through service
                      console.log("results : ",results);
                        options.success(results.results);  
                    }).error(function (error) {
                        options.error(erro);
                    });
                },
            },
            pageable : true, // enables pagination
            pageSize:5,  // per page data
            page : 1,  
            schema: {  // schema for data coming from APIs
              model: {
                    id : "paymentId",
                    fields: {
                        paymentId : {type : "number"},
                        orderDate: { editable: false, type: 'date'}, 
                        customerEmail: { editable: false, type : "string"},
                        merchatId : { editable: false,  type : "number"},
                        amount : { editable: false ,  type : "number"},
                        paymentStatus : { editable: false, type : "string"} 
                      }
                  }
            }  
          });
          $scope.widgets.transactionGrid.setDataSource(dataSource); // feeling dataSource in grid
          $scope.widgets.transactionGrid.refresh();  // refershing the older version
    }

    $scope.isActive = function(route) {
        return route === $location.path();
    } 
                 
    var init = function () { // initial function
      console.log('DashboardCtrl.init()'); 
      fetchTransactionData();
    }();

});
