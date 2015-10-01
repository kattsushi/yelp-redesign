angular.module('app')
.controller('MapController', function( $scope, $rootScope, $log, $q, uiGmapGoogleMapApi, YelpAPI ) {

	$scope.viewID = "map";

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 2, markerZoom:13, options: { overviewMapControl:false, mapTypeControl:false, panControl:false, scaleControl:false, zoomControl:false, streetViewControl: false, styles: $rootScope.mapStyles.coolgrey} };

    $scope.noCache = true;
    $scope.searchText = "";
    $scope.selectedItemChange = $scope.selectedItemChange;
    $scope.searchTextChange   = $scope.searchTextChange;

    $scope.markers = [];

    $scope.bookmarkedMarkers = [];

    $scope.currentMarker;

    var deferred = $q.defer();

	  // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {

    });

    $scope.init = function() {

    };

    $scope.querySearch = function(query) {

      deferred = $q.defer();

      YelpAPI.search(query)
      .success(function(data) {
        deferred.resolve(data.businesses);
      });

      return deferred.promise;

    };

    $scope.selectedItemChange = function(item) {

    	if(item) {
        
        var markerData = angular.copy(item);
	      markerData.id = Date.now();
        markerData.latitude = item.location.coordinate.latitude;
        markerData.longitude = item.location.coordinate.longitude;

	      $scope.markers.push(markerData);
        $scope.map.zoom = $scope.map.markerZoom;
	      $scope.map.center = { latitude: item.location.coordinate.latitude, longitude: item.location.coordinate.longitude };

	      $scope.currentMarker = markerData;

  		}
    };

    $scope.handleAddMarker = function() {
      $scope.bookmarkedMarkers.push($scope.currentMarker);
    };

    $scope.handleCenterOnMarker = function(marker) {
      $scope.map.center = { latitude: marker.latitude, longitude: marker.longitude };
    };

    $scope.handleRemoveMarker = function(marker) {
      var index = $scope.bookmarkedMarkers.indexOf(marker);
      $scope.bookmarkedMarkers.splice(index, 1); 
    };

    $scope.init();

});

