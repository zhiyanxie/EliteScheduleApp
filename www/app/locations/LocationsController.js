'use strict';


eliteApp.controller('LocationsController',


    function LocationController($scope,eliteApi){

            eliteApi.getLeagueData().then(function(data){
             
              	$scope.locations = data.locations;
             });
    }



);