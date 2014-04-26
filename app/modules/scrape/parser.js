'use strict';

var cheerio = require('cheerio');

var Parser = function(){

};

var transform = function(heroname){
	return heroname.toLowerCase()
					.split(' ').join('-')
					.split('\'').join('');
};

Parser.prototype.parseMatchupStats = function(html, callback){
	var $ = cheerio.load(html);
	
	var tables = $('table');
	var data = {
		best: [],
		worst: []
	};

	tables.each(function(i, table){
		var tbody = $(table).children().first().next();
		var rows = $(tbody).children();
		$(rows).each(function(j, row){
			var columns = $(row).children();
			var stat = {
				name: transform($($(columns).get(1)).text()),
				percent: $($(columns).get(2)).text()
			};
			if(i === 0){
				data.best.push(stat);
			}else{
				data.worst.push(stat);
			}
		});
	});
	callback(data);
};

Parser.prototype.parseAllHeroes = function(html, callback){
	var $ = cheerio.load(html),
		arr = [];

	var heroes = $('.hero-grid').children();
	heroes.each(function(i, hero){
		arr.push({
			name: $(hero).attr('href').substring(8)
		});
	});

	callback(arr);
};

module.exports = new Parser();