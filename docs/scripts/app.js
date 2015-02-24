'use strict';

angular.module('mgcrea.ngStrapDocs', ['mgcrea.ngStrap', 'mgcrea.ngPlunkr', 'ngRoute', 'ngAnimate'])

.constant('version', 'v2.2.0')

.config(function($plunkrProvider, version) {

  angular.extend($plunkrProvider.defaults, {
    plunkrTitle: 'AngularStrap Example Plunkr',
    plunkrTags: ['angular', 'angular-strap'],
    plunkrPrivate: false,
    contentHtmlUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/',
    contentJsUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/'
  });

})

.config(function($routeProvider, $compileProvider, $locationProvider, $sceProvider) {

  // Configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(false);

  // Disable strict context
  $sceProvider.enabled(false);

  // Disable scope debug data
  $compileProvider.debugInfoEnabled(false);

})

.run(function($window, $rootScope, $location, $anchorScroll, version) {

  $rootScope.version = version;

  // FastClick
  $window.FastClick.attach($window.document.body);

  // Support simple anchor id scrolling
  var bodyElement = angular.element($window.document.body);
  bodyElement.on('click', function(evt) {
    var el = angular.element(evt.target);
    var hash = el.attr('href');
    if(!hash || hash[0] !== '#') return;
    if(hash.length > 1 && hash[1] === '/') return;
    if(evt.which !== 1) return;
    $location.hash(hash.substr(1));
    $anchorScroll();
  });

  // Initial $anchorScroll()
  setTimeout(function() {
    $anchorScroll();
  }, 0);

})

