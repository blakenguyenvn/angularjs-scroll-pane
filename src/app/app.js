;(function(){
  'use strict';

  /**
   * Main NYTimes app
   */
  var MainApp = angular.module('MainApp', [
		 'ngScrollbars'
  ]);

  MainApp.config(function(ScrollBarsProvider) {
    //== Default configuration for ScrollBars
    ScrollBarsProvider.defaults = {
			autoHideScrollbar: false,
			scrollInertia: 500,
			theme: 'dark',
			axis: 'y',
			advanced: {
				updateOnContentResize: true
			}
		};

  });

})()
