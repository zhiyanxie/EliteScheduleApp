'use strict';


eliteApp.controller("StandingsController",



	function StandingsController($scope,eliteApi){

         eliteApi.getLeagueData().then(function(data){
         			$scope.divisions = data.standings;
          });

	}






);