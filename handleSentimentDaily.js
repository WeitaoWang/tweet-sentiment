var mongoose = require('mongoose'),
	Tweet = require('./tweet'),
	SentimentResultWeekly = require('./sentimentResultDaily'),
	db = require('./dbConnection');

var dates = ["4-10-2016","4-11-2016","4-12-2016","4-13-2016","4-14-2016","4-15-2016",
"4-16-2016","4-17-2016","4-18-2016","4-19-2016","4-20-2016"];

var candidates = ["Donald Trump", "Hillary Clinton", "Ted Cruz", "Bernie Sanders"];

for(var i = 0; i < dates.length; i ++) {
	for(var j = 0; j < candidates.length; j ++) {

	}
}
function getDailyTweets(date, stateName, candidateName, callback) {
	Tweet.find({states: stateName, candidates: candidateName, created_at: date}).
		exec(function(err, tweets) {
			if (err) {
					return console.log(err);
			}else if(tweets.length == 0){
				callback(null);
				//console.log("No Tweets");
			}else {
				callback(tweets);
			}
		});
}