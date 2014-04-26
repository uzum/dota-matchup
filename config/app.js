'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
    root: rootPath,
    port: process.env.PORT || 3000,
    templateEngine: 'jade',

    dotabuff: {
    	rootUrl: 'http://dotabuff.com',
    	userAgent: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.116 Safari/537.36'
    }
};