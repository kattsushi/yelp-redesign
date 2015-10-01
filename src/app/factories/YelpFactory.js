angular.module('app')
.factory('YelpAPI', function($http,$log){

    return {
	    search: function(query) {
	    	$log.debug('YelpAPI - search: '+query);

	    	//Fake it till you make it
	    	return $http.get('data/data.json');
	    }
	};
});