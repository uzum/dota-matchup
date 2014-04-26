'use strict';

var request = require('request'),
	config = require('../../../config/app'),
	parser = require('./parser');

var _rootUrl = config.dotabuff.rootUrl,
	_userAgent = config.dotabuff.userAgent;

var Fetcher = function(){
};

var _request = function(url, callback){
	request({
		url: url,
		headers: {
			'User-Agent': _userAgent
		}
	}, function(error, response, body){
		if(error){
			console.log('Error in fetching html page: ' + error);
		}else{
			callback(body);
		}
	});
};

Fetcher.prototype.fetchMatchupStats = function(hero, callback){
	var url = _rootUrl + '/heroes/' + hero.name + '/_versus';
	_request(url, function(response){
		parser.parseMatchupStats(response, callback);
	});
};

Fetcher.prototype.fetchAllHeroes = function(callback){
	var url = _rootUrl + '/heroes';
	_request(url, function(response){
		parser.parseAllHeroes(response, callback);
	});
};

module.exports = new Fetcher();