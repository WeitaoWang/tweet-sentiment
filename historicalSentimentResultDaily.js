var mongoose = require('mongoose'),	
	SentimentResultDaily = require('./sentimentResultDaily'),
	db = require('./dbConnection');

module.exports = function(callback) {
	SentimentResultDaily.find(function(err, tweets) {
		if(err) {
			console.log(err);
		}else {
			callback(tweets);
		}
	});	
} 