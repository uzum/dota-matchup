var heroController = require('../controllers/heroes');

module.exports = function(app){
	app.get('/heroes/:hero/matchups', function(request, response){
		var heroName = request.params.hero;
		heroController.getHeroMatchups(heroName, function(matchups){
			response.json(matchups);
		});
	});

	app.get('/heroes/all', function(request, response){
		heroController.getAllHeroes(function(heroes){
			response.json(heroes);
		});
	});

	app.get('/update/heroes', function(request, response){
		heroController.updateHeroes(function(){
			response.send(200);
		});
	});

	app.get('/update/stats', function(request, response){
		heroController.updateMatchupStats(function(){
			response.send(200);
		});
	});
};