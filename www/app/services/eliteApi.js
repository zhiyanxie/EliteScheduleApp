'use strict';

eliteApp.factory("eliteApi",function($http,$q,$ionicLoading,$timeout,$rootScope){
    
    var currentLeagueId;

    function getLeagues(){
    	var deferred = $q.defer();
    	$http.get("http://elite-schedule.net/api/leaguedata")
    	             .success(function(data){
                            deferred.resolve(data);
    	             })
    	             .error(function(){
    	      	            //console.log("Error while making HTTP call.")
    	      	            deferred.reject();
    	      });
    	return deferred.promise;
    }

   
    function getLeagueData(){
    	var deferred = $q.defer();
    	
        $ionicLoading.show({template: 'Loading...'});
        console.log("getLeague Data undefeined?");
        if (typeof currentLeagueId =="undefined"){
            console.log("getLeague Data is undefeined");
            currentLeagueId = $rootScope.leagueId;
        }

    	$http.get("http://elite-schedule.net/api/leaguedata/"+currentLeagueId)
    	      .success(function(data,status){
                $timeout(function(){

                    $ionicLoading.hide();
                    //console.log("Received schedule data via HTTP",data,status);
                    deferred.resolve(data);
                },50);
                
    	      })
    	      .error(function(){
                $ionicLoading.hide();
    	      	//console.log("Error while making HTTP call.")
    	      	deferred.reject();
    	      });
    	return deferred.promise;
    };


    function setLeagueId(leagueId){
        currentLeagueId = $rootScope.leagueId;
    	currentLeagueId = leagueId;
        
    }
    return {
    	getLeagues: getLeagues,
    	getLeagueData: getLeagueData,
    	setLeagueId: setLeagueId

    };





});