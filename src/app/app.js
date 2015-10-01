angular.module( 'app', [
  'ui.router',
  'ngTouch',
  'ngSanitize',
  'uiGmapgoogle-maps',
  'ngAria',
  'ngMaterial',
  'ngAnimate'
])
.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});