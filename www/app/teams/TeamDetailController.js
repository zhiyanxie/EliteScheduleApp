'use strict';


eliteApp.controller('TeamDetailController',


	function TeamDetailController($scope,$stateParams,$ionicPopup,eliteApi){



      $scope.teamId = Number($stateParams.id);
      
      eliteApi.getLeagueData().then(function(data){
		      var t ,d;
		      for( t in data.teams){
		      	var temp =data.teams[t];
		      	for (d in temp["divisionTeams"]){
		      		if ($scope.teamId == temp["divisionTeams"][d]["id"]){
		      			 $scope.teamName = temp["divisionTeams"][d]["name"];
		      			 var team = temp["divisionTeams"][d];
		      		}
		      	}
		      }


		      for( t in data.standings){
		      	var temp =data.standings[t];	      
		      	for (d in temp["divisionStandings"]){	      	
		      		if ($scope.teamId == temp["divisionStandings"][d]["teamId"]){
		      			 $scope.teamStandings = temp["divisionStandings"][d];
		      		}
		      	}
		      }

		      $scope.games = _.chain(data.games)
		                      .filter(isTeamInGame)
		                      .map(function(item){
		                      	var isTeam1 = (item.team1Id === $scope.teamId ? true : false);
		                      	var opponentName = isTeam1 ? item.team2 :item.team1;
		                      	var scoreDisplay = getScoreDisplay(isTeam1,item.team1Score,item.team2Score);
		                      	return {
		                      			gameId: item.id,
		                      			opponent: opponentName,
		                      			time: item.time,
		                      			location: item.location,
		                      			locationUrl: item.locationUrl,
		                      			scoreDisplay: scoreDisplay,
		                      			homeAway: (isTeam1 ? "vs.": "at")
		                      	};
		                      })
		                      .value();

		       function isTeamInGame(item){
       	   					return item.team1Id === $scope.teamId || item.team2Id === $scope.teamId;
       			}

      		 	function getScoreDisplay(isTeam1, team1Score, team2Score){
       					  if(team1Score && team2Score){
       	  						var teamScore = (isTeam1 ? team1Score : team2Score);
       	  						var opponentScore = (isTeam1 ? team2Score :team1Score);
       	  						var winIndicator = teamScore >opponentScore ? "Win: ": "Loss: ";
       	  						return winIndicator + teamScore + "-" +opponentScore;

       	  				  }else{
       	  						return "";
       	  				  }
     		    };

       });
      
      $scope.following = false;

      $scope.toggleFollow= function(){
            if ($scope.following){
            	var confirmPopup = $ionicPopup.confirm({
            		title: "Unfollow?",
            		template:"Are you sure to unfollow?"
            	});
            	confirmPopup.then(function(res){
            		if(res){
            			$scope.following =! $scope.following;
            		}
            	});
            }else{
            	$scope.following =! $scope.following;
            }
      };
     

    


    }


   
    
);