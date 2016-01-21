'use strict'

eliteApp.controller("LeaguesController",

    function LeaguesController($state,$scope,eliteApi,$rootScope){

    	eliteApi.getLeagues().then(function(data){
            $scope.leagues = data;
          
        });

    	
    	//console.log(leagues,leaguesData);

    	$scope.selectLeague = function(leagueId){
                eliteApi.setLeagueId(leagueId);
                $rootScope.leagueId = leagueId;
                console.log("setleagueId complete:   "+leagueId)
                $state.go("app.teams");
    	}


    }



);