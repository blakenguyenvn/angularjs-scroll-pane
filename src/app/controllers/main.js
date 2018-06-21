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

  MainControllerInit.$inject = ['$scope', '$sce'];

  function MainControllerInit($scope, $sce, NewsActions){

    $scope.news_store = NewsStore.init({
      api_key: '092b8aac63e3484ea21a5245dfe44acc'
    });

    $scope.news_actions = NewsActions;
    /**
     *  Define load more news functions
     */
    $scope.loadMoreNews = function(){
      $scope.news_actions.loadMoreNews();
    };

    /**
     * Scroll Pane Config
     */
     

  };

})()
