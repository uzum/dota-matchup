angular.module('HeroService', []).factory('Hero', ['$http', function($http) {
	return {
		getAllHeroes: function(){
			return $http({
				url: 'heroes/all',
				method: 'GET'
			});
		},

		getHeroMatchups: function(hero){
			return $http({
				url: 'heroes/' + hero + '/matchups',
				method: 'GET'
			});
		}
	}
}]);