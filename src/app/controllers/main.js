;(function(){

  /**
   * Main app: Main Controller
   */
  var MainApp = angular.module('MainApp');

  MainApp.controller('MainController', MainControllerInit)
    .filter('to_trusted',
      ['$sce', function($sce){
        return function(text) {
          return $sce.trustAsHtml(text);
        }
      }]
    );

  MainControllerInit.$inject = ['$scope', '$sce', '$http', '$q'];

  function MainControllerInit($scope, $sce, $http, $q) {

    /**
     * News Pane Object
     * Note: You shoould move this object to AngularJS Service when use in project
     */
     $scope.newsPanel = {
         data: {},
         currentPage: 0,
         isLoading: false,
         requestConfig: {
             api_key: '092b8aac63e3484ea21a5245dfe44acc',
             nation: 'singapore',
             page: 0
         },
         scrollbarConfig: {
             setHeight: 'auto',
             mouseWheel: {
	                preventDefault: false
                },
    		callbacks: {
    		onTotalScrollOffset: 0,
    		onTotalScroll: function() {
    			$scope.newsPanel.loadMore();
    		},
    	 	onCreate: function() {
     			var height = '90vh';
    	      		$(this).css('max-height', height);
    		    }
    		}
        }
     };

     //== News Panel: load data function
     $scope.newsPanel.loadData = function () {

         var self = this;

         //== Check if API Key is wrong
         if (self.requestConfig.api_key == null) {

             console.error('API key is wrong.');
             return false;

         } else {

             var deferred = $q.defer();
             var self = this;

             //== Start loading
             self.isLoading = true;

             $http({
                 method : 'GET',
                 url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + self.requestConfig.api_key + "&q=" + self.requestConfig.nation + "&page=" + self.requestConfig.page,
                 async: false
             })
             .then(function successCallback(response) {

                 if (response.data.status != undefined && response.data.status == 'OK') {

                     self.data[self.requestConfig.page] = response.data.response.docs;
                     console.log(self.data);
                     self.currentPage = self.requestConfig.page;

                     deferred.resolve(response);
                 }
                 //== Stop Loading
                 self.isLoading = false;

             }, function errorCallback(response) {

                 //== Handle error and stop loading
                 deferred.reject(error);
                 self.isLoading = false;

            });

            //== Return Promise
            return deferred.promise;
         }
     };

     //== News Panel: load More Function
     $scope.newsPanel.loadMore = function () {
         var self = this;

         self.requestConfig.page = self.currentPage + 1;

         self.loadData();
     };

     //== News panel Init function, we can config API key, first page or any init data
     $scope.newsPanel.init = function() {
         this.loadData();
     }

     /**
      * Controller Run Init
      */
      $scope.newsPanel.init();

  };

})()
