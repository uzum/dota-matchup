angular.module('Recommender', []).factory('Recommender', function($http, Hero) {
	var cumulativeStats = {};
	var enemyHeroes = [];

	var merge = function(entry, isBest){
		if(!cumulativeStats[entry.enemy]) cumulativeStats[entry.enemy] = 0;
		cumulativeStats[entry.enemy] += parseFloat(entry.percent);
	};

	var sort = function(){
		var sorted = [];
		for(var hero in cumulativeStats){
			if(cumulativeStats.hasOwnProperty(hero)){
				sorted.push({
					hero: hero,
					percent: cumulativeStats[hero]
				});
			}
		}

		return sorted.sort(function(x, y){
			return x.percent - y.percent;
		});
	}

	return {
		feed: function(heroes){
			cumulativeStats = {};
			enemyHeroes = heroes;
		},

		reset: function(){
			cumulativeStats = {};
		},

		get: function(callback){
			var callbackCounter = 0;
			enemyHeroes.forEach(function(hero){
				if(hero.name !== ""){
					callbackCounter++;
					Hero.getHeroMatchups(hero.name).success(function(response){
						response.worst.forEach(function(entry){
							merge(entry);
						});
						response.best.forEach(function(entry){
							merge(entry);
						});
						if(!--callbackCounter){
							callback(sort(cumulativeStats));
						}
					});
				}
			});
		}
	}
});