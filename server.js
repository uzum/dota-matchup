// modules =================================================
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');

require('./app/models/hero');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 3000;
mongoose.connect(db.url);

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser()); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
});

// routes ==================================================
require('./app/routes/heroes')(app);
require('./app/routes/index')(app);

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			
exports = module.exports = app; 						