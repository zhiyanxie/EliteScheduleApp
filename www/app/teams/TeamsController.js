'use strict';


eliteApp.controller("TeamsController",



	function TeamsController($scope,eliteApi){
         eliteApi.getLeagueData().then(function(data){

            $scope.divisions = data.teams;
         });
       
         

        
       

	}






);