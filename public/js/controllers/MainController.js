angular.module('MainController', []).controller('MainController', function($scope, Hero, Recommender) {

	$scope.enemyHeroes = [];
	for(var i = 0; i < 5; i++){
		$scope.enemyHeroes.push({
			name: ''
		});
	}

	Hero.getAllHeroes().success(function(response){
		$scope.heroes = response;
	});

	$scope.recommend = function(){
		Recommender.reset();
		Recommender.feed($scope.enemyHeroes);
		Recommender.get(function(recs){
			$scope.recommendeds = recs;
		});
	}
});