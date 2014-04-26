'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Hero = mongoose.model('Hero'),
    sync = require('../modules/sync/sync');

exports.getHeroMatchups = function(heroName, callback){
	Hero.findOne({name: heroName}, function(error, hero){
		if(error){
			console.log('hero not found');
		}else{
			var _matchups = {
				best: [],
				worst: []
			};

			var callbackCounter = hero.matchups.length;
			hero.matchups.forEach(function(matchup){
				Hero.findOne({_id: matchup.enemy}, function(error, enemy){
					if(error){
						console.log('enemy not found');
					}else{
						_matchups[matchup.category].push({
							enemy: enemy.name,
							percent: matchup.percent
						});

						if(!--callbackCounter){
							callback(_matchups);
						}
					}
				});
			});
		}
	});
};

exports.getAllHeroes = function(callback){
	Hero.find(function(error, response){
		if(error){
			console.log('mongo error: ' + error);
		}else{
			var result = [];
			response.forEach(function(hero){
				result.push(hero.name);
			});
			callback(result);
		}
	});
};

exports.updateMatchupStats = function(){
	sync.updateMatchupStats();
};

exports.updateHeroes = function(){
	sync.updateHeroes();
};