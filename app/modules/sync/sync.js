'use strict';

var fetcher = require('../scrape/fetcher');

var mongoose = require('mongoose'),
	Hero = mongoose.model('Hero');

exports.updateHeroes = function(){
	fetcher.fetchAllHeroes(function(heroes){
		heroes.forEach(function(heroSchema){
			var _hero = new Hero(heroSchema);
			_hero.save(function(error){
				if(error){
					console.log('Cannot save schema to the database');
				}else{
					console.log('Schema saved: ' + heroSchema.name);
				}
			});
		});
	});
};

var updateHeroMatchupStats = function(hero){
	fetcher.fetchMatchupStats(hero, function(stats){
		hero.matchups = [];

		var callbackCounter = stats.best.length + stats.worst.length;

		stats.best.forEach(function(stat){
			Hero.findOne({name: stat.name}, function(error, enemy){
				hero.matchups.push({
					category: 'best',
					enemy: enemy,
					percent: stat.percent
				});
				if(!--callbackCounter){
					hero.save();
				}
			});
		});		

		stats.worst.forEach(function(stat){
			Hero.findOne({name: stat.name}, function(error, enemy){
				hero.matchups.push({
					category: 'worst',
					enemy: enemy,
					percent: stat.percent
				});
				if(!--callbackCounter){
					hero.save();
				}
			});
		});
	});
};

exports.updateMatchupStats = function(){
	Hero.find(function(error, response){
		response.forEach(function(hero){
			updateHeroMatchupStats(hero);
		});
	});
};