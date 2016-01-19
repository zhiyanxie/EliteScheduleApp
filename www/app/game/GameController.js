'use strict';


eliteApp.controller("GameController",



	function GameController($scope,$stateParams,eliteApi){

		var gameId = Number($stateParams.id);
		eliteApi.getLeagueData().then(function(data){
				$scope.game = _.find(data.games,{"id": gameId});

        });
	}





);